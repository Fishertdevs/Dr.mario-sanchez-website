import { Router } from "express";
import { db } from "@workspace/db";
import { socialLinksTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/social-links", async (_req, res) => {
  const links = await db
    .select()
    .from(socialLinksTable)
    .where(eq(socialLinksTable.isActive, true))
    .orderBy(socialLinksTable.sortOrder);
  res.json(links);
});

export default router;
