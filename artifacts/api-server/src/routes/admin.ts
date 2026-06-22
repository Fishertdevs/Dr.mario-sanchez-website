import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable, socialLinksTable, settingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import crypto from "node:crypto";

const router = Router();

const DEFAULT_SOCIAL_LINKS = [
  { platform: "youtube",   label: "YouTube",   url: "https://youtube.com/@drmariosanchez7124", iconKey: "youtube",   isActive: true, sortOrder: 0 },
  { platform: "tiktok",    label: "TikTok",    url: "https://tiktok.com/@dr.terapia",          iconKey: "tiktok",    isActive: true, sortOrder: 1 },
  { platform: "whatsapp",  label: "WhatsApp",  url: "https://wa.me/573143127513",              iconKey: "whatsapp",  isActive: true, sortOrder: 2 },
  { platform: "instagram", label: "Instagram", url: "https://instagram.com/drterapia3",        iconKey: "instagram", isActive: true, sortOrder: 3 },
];

async function seedSocialLinks() {
  const existing = await db.select().from(socialLinksTable).limit(1);
  if (existing.length === 0) {
    await db.insert(socialLinksTable).values(DEFAULT_SOCIAL_LINKS);
  }
}

seedSocialLinks().catch(() => {});

async function getSetting(key: string): Promise<string> {
  try {
    const [row] = await db.select().from(settingsTable).where(eq(settingsTable.key, key));
    return row?.value ?? "";
  } catch {
    return "";
  }
}

async function setSetting(key: string, value: string): Promise<void> {
  const existing = await db.select().from(settingsTable).where(eq(settingsTable.key, key));
  if (existing.length > 0) {
    await db.update(settingsTable).set({ value, updatedAt: new Date() }).where(eq(settingsTable.key, key));
  } else {
    await db.insert(settingsTable).values({ key, value });
  }
}

async function requireAdmin(req: any, res: any, next: any) {
  const auth = req.headers["authorization"] ?? "";
  const token = auth.replace("Bearer ", "").trim();
  if (!token) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  const stored = await getSetting("session_token");
  if (!stored || token !== stored) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  next();
}

router.get("/admin/status", async (_req, res) => {
  const adminEmail = await getSetting("admin_email");
  res.json({ needsSetup: !adminEmail });
});

router.post("/admin/auth/google", async (req, res) => {
  const { access_token } = req.body ?? {};
  if (!access_token || typeof access_token !== "string") {
    res.status(400).json({ error: "Token de Google requerido" });
    return;
  }

  let email: string;
  try {
    const r = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const payload = await r.json() as Record<string, string>;
    if (!r.ok || !payload["email"]) {
      res.status(401).json({ error: "Token de Google inválido" });
      return;
    }
    email = payload["email"].toLowerCase().trim();
  } catch {
    res.status(500).json({ error: "Error al verificar con Google" });
    return;
  }

  const adminEmail = await getSetting("admin_email");

  if (!adminEmail) {
    const newToken = crypto.randomBytes(32).toString("hex");
    await setSetting("admin_email", email);
    await setSetting("session_token", newToken);
    res.json({ token: newToken, email });
    return;
  }

  if (email !== adminEmail.toLowerCase().trim()) {
    res.status(401).json({ error: "Esta cuenta de Google no está autorizada para acceder al panel" });
    return;
  }

  const newToken = crypto.randomBytes(32).toString("hex");
  await setSetting("session_token", newToken);
  res.json({ token: newToken, email });
});

router.post("/admin/logout", requireAdmin, async (_req, res) => {
  await setSetting("session_token", "");
  res.json({ ok: true });
});

router.get("/admin/verify", requireAdmin, async (_req, res) => {
  const email = await getSetting("admin_email");
  res.json({ ok: true, email });
});

router.put("/admin/change-email", requireAdmin, async (req, res) => {
  const { new_email } = req.body ?? {};
  if (!new_email || typeof new_email !== "string" || !new_email.includes("@")) {
    res.status(400).json({ error: "Email inválido" });
    return;
  }
  await setSetting("admin_email", new_email.toLowerCase().trim());
  res.json({ ok: true });
});

router.get("/admin/settings", requireAdmin, async (_req, res) => {
  const rows = await db.select().from(settingsTable);
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;
  map["admin_email"] = map["admin_email"] ?? "";
  delete map["session_token"];
  res.json(map);
});

router.put("/admin/settings", requireAdmin, async (req, res) => {
  const { key, value } = req.body ?? {};
  if (!key || value === undefined) {
    res.status(400).json({ error: "key y value son requeridos" });
    return;
  }
  if (key === "session_token" || key === "admin_email") {
    res.status(403).json({ error: "Clave reservada" });
    return;
  }
  await setSetting(key, value);
  res.json({ ok: true });
});

router.get("/admin/reviews", requireAdmin, async (_req, res) => {
  const reviews = await db.select().from(reviewsTable).orderBy(reviewsTable.createdAt);
  res.json(reviews);
});

router.put("/admin/reviews/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const { authorName, authorRole, rating, content, isApproved } = req.body ?? {};
  const [updated] = await db
    .update(reviewsTable)
    .set({ authorName, authorRole, rating, content, isApproved })
    .where(eq(reviewsTable.id, id))
    .returning();
  if (!updated) { res.status(404).json({ error: "No encontrado" }); return; }
  res.json(updated);
});

router.post("/admin/reviews/:id/approve", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const [updated] = await db
    .update(reviewsTable)
    .set({ isApproved: true })
    .where(eq(reviewsTable.id, id))
    .returning();
  if (!updated) { res.status(404).json({ error: "No encontrado" }); return; }
  res.json(updated);
});

router.delete("/admin/reviews/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  await db.delete(reviewsTable).where(eq(reviewsTable.id, id));
  res.json({ ok: true });
});

router.get("/admin/social-links", requireAdmin, async (_req, res) => {
  const links = await db.select().from(socialLinksTable).orderBy(socialLinksTable.sortOrder);
  res.json(links);
});

router.post("/admin/social-links", requireAdmin, async (req, res) => {
  const { platform, label, url, iconKey, isActive, sortOrder } = req.body ?? {};
  const [link] = await db
    .insert(socialLinksTable)
    .values({ platform, label, url, iconKey: iconKey ?? platform, isActive: isActive ?? true, sortOrder: sortOrder ?? 0 })
    .returning();
  res.status(201).json(link);
});

router.put("/admin/social-links/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  const { platform, label, url, iconKey, isActive, sortOrder } = req.body ?? {};
  const [updated] = await db
    .update(socialLinksTable)
    .set({ platform, label, url, iconKey, isActive, sortOrder })
    .where(eq(socialLinksTable.id, id))
    .returning();
  if (!updated) { res.status(404).json({ error: "No encontrado" }); return; }
  res.json(updated);
});

router.delete("/admin/social-links/:id", requireAdmin, async (req, res) => {
  const id = Number(req.params["id"]);
  await db.delete(socialLinksTable).where(eq(socialLinksTable.id, id));
  res.json({ ok: true });
});

export { router as adminRouter };
