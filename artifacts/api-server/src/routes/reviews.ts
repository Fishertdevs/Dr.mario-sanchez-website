import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable, insertReviewSchema } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/reviews", async (_req, res) => {
  const reviews = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.isApproved, true))
    .orderBy(reviewsTable.createdAt);
  res.json(reviews);
});

router.post("/reviews", async (req, res) => {
  const parsed = insertReviewSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Datos inválidos", details: parsed.error.issues });
    return;
  }
  const [review] = await db
    .insert(reviewsTable)
    .values({ ...parsed.data, isApproved: false })
    .returning();
  res.status(201).json(review);
});

export default router;
