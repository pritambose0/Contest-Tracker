import { Router } from "express";
import {
  addSolution,
  deleteSolution,
  getAllSolutions,
  updateSolutionLink,
} from "../controllers/solution.controller.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:contestId/solution").post(verifyJWT, verifyAdmin, addSolution);

router
  .route("/:contestId/solutions/:solutionId")
  .delete(verifyJWT, verifyAdmin, deleteSolution);
router.route("/:contestId/solutions").get(getAllSolutions);
router.route("/solution/update-auto").get(updateSolutionLink);

export default router;
