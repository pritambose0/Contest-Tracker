import { schedule } from "node-cron";
import { retrieveContests } from "../controllers/contest.controller.js";
import { updateSolutionLink } from "../controllers/solution.controller.js";

schedule("0 0 * * *", async () => {
  console.log("⏳ Running daily contest update...");
  await retrieveContests();
  console.log("✅ Contests updated!");
});

schedule("0 0 * * *", async () => {
  console.log("⏳ Running daily solution link update...");
  await updateSolutionLink();
  console.log("✅ Solution link updated!");
});
