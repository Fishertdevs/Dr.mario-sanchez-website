import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable, socialLinksTable, settingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import crypto from "node:crypto";

const router = Router();

const SESSION_TOKEN = crypto.randomBytes(32).toString("hex");

const DEFAULT_SOCIAL_LINKS = [
  { platform: "youtube",   label: "YouTube",   url: "https://youtube.com/@drmariosanchez",      iconKey: "youtube",   isActive: true, sortOrder: 0 },
  { platform: "tiktok",    label: "TikTok",    url: "https://tiktok.com/@dr..terapia",          iconKey: "tiktok",    isActive: true, sortOrder: 1 },
  { platform: "whatsapp",  label: "WhatsApp",  url: "https://wa.me/573143127513",               iconKey: "whatsapp",  isActive: true, sortOrder: 2 },
  { platform: "instagram", label: "Instagram", url: "https://instagram.com/drmariosanchez7124", iconKey: "instagram", isActive: true, sortOrder: 3 },
];

async function seedSocialLinks() {
  const existing = await db.select().from(socialLinksTable).limit(1);
  if (existing.length === 0) {
    await db.insert(socialLinksTable).values(DEFAULT_SOCIAL_LINKS);
  }
}

seedSocialLinks().catch(() => {});

async function getAdminEmail(): Promise<string> {
  try {
    const [row] = await db.select().from(settingsTable).where(eq(settingsTable.key, "admin_email"));
    if (row?.value) return row.value;
  } catch {}
  return process.env["ADMIN_EMAIL"] ?? "";
}

function requireAdmin(req: any, res: any, next: any) {
  const auth = req.headers["authorization"] ?? "";
  const token = auth.replace("Bearer ", "");
  if (token !== SESSION_TOKEN) {
    res.status(401).json({ error: "No autorizado" });
    return;
  }
  next();
}

router.post("/admin/login", async (req, res) => {
  const { email } = req.body ?? {};
  const adminEmail = await getAdminEmail();
  if (!adminEmail) {
    res.status(500).json({ error: "ADMIN_EMAIL no configurado en el servidor" });
    return;
  }
  if (!email || email.toLowerCase().trim() !== adminEmail.toLowerCase().trim()) {
    res.status(401).json({ error: "Correo no autorizado" });
    return;
  }
  res.json({ token: SESSION_TOKEN });
});

router.get("/admin/settings", requireAdmin, async (_req, res) => {
  const rows = await db.select().from(settingsTable);
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value;
  const adminEmail = await getAdminEmail();
  res.json({ ...map, admin_email: adminEmail });
});

router.put("/admin/settings", requireAdmin, async (req, res) => {
  const { key, value } = req.body ?? {};
  if (!key || value === undefined) {
    res.status(400).json({ error: "key y value son requeridos" });
    return;
  }
  const existing = await db.select().from(settingsTable).where(eq(settingsTable.key, key));
  if (existing.length > 0) {
    await db.update(settingsTable).set({ value, updatedAt: new Date() }).where(eq(settingsTable.key, key));
  } else {
    await db.insert(settingsTable).values({ key, value });
  }
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
