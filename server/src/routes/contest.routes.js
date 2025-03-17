import { Router } from "express";
import {
  getPastContests,
  getUpcomingContests,
  retrieveContests,
  toggleBookmark,
} from "../controllers/contest.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/update").post(retrieveContests);
router.route("/upcoming").get(getUpcomingContests);
router.route("/past").get(getPastContests);
router.route("/:contestId/bookmark").post(verifyJWT, toggleBookmark);

export default router;
