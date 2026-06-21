import { Router, type IRouter } from "express";
import healthRouter from "./health";
import reviewsRouter from "./reviews";
import socialLinksRouter from "./social_links";
import { adminRouter } from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(reviewsRouter);
router.use(socialLinksRouter);
router.use(adminRouter);

export default router;
