import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { UserSchema } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ContestSchema } from "../models/contest.model.js";

const fetchCodeforcesContests = async () => {
  try {
    const response = await axios.get(
      "https://codeforces.com/api/contest.list",
      { timeout: 10000 }
    );
    return response.data?.result?.map((contest) => ({
      name: contest.name,
      platform: "Codeforces",
      startTime: new Date(contest.startTimeSeconds * 1000),
      duration: contest.durationSeconds / 60,
      url: `https://codeforces.com/contests/${contest.id}`,
      status: contest.phase === "BEFORE" ? "upcoming" : "past",
    }));
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error.message);
    return [];
  }
};

const fetchCodeChefContests = async () => {
  try {
    const response = await axios.get(
      "https://www.codechef.com/api/list/contests/all",
      { timeout: 10000 }
    );

    const upcoming = response.data.future_contests.map((contest) => ({
      name: contest.contest_name,
      platform: "CodeChef",
      startTime: new Date(contest.contest_start_date_iso),
      duration: parseInt(contest.contest_duration),
      url: `https://www.codechef.com/${contest.contest_code}`,
      status: "upcoming",
    }));

    const past = response.data.past_contests.map((contest) => ({
      name: contest.contest_name,
      platform: "CodeChef",
      startTime: new Date(contest.contest_start_date_iso),
      duration: parseInt(contest.contest_duration) / 60,
      url: `https://www.codechef.com/${contest.contest_code}`,
      status: "past",
    }));

    return [...upcoming, ...past];
  } catch (error) {
    console.error("Error fetching CodeChef contests:", error.message);
    return [];
  }
};

const retrieveContests = async (_, __) => {
  try {
    const results = await Promise.allSettled([
      fetchCodeforcesContests(),
      fetchCodeChefContests(),
    ]);

    const contests =
      results
        .filter((result) => result.status === "fulfilled")
        .flatMap((result) => result.value) || [];

    // console.log("Contests: ", contests);

    await ContestSchema.bulkWrite(
      contests.map((contest) => ({
        updateOne: {
          filter: {
            name: contest.name,
            platform: contest.platform,
            startTime: contest.startTime,
          },
          update: contest,
          upsert: true,
        },
      }))
    );
  } catch (error) {
    console.error("Error retrieving contests:", error.message);
  }
};

const getUpcomingContests = asyncHandler(async (req, res) => {
  const { platform } = req.query;
  const query = { status: "upcoming" };

  if (platform) {
    query.platform = { $in: platform.split(",") };
  }

  const contests = await ContestSchema.find(query);

  return res
    .status(200)
    .json(new ApiResponse(200, contests, "Contests fetched successfully"));
});

const getPastContests = asyncHandler(async (req, res) => {
  const { platform } = req.query;
  const query = { status: "past" };

  if (platform) {
    query.platform = { $in: platform.split(",") };
  }

  const contests = await ContestSchema.find(query);

  return res
    .status(200)
    .json(new ApiResponse(200, contests, "Contests fetched successfully"));
});

const toggleBookmark = asyncHandler(async (req, res) => {
  const { contestId } = req.params;
  const user = await UserSchema.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isBookmarked = user.bookmarks.includes(contestId);

  if (isBookmarked) {
    user.bookmarks = user.bookmarks.filter((id) => id.toString() !== contestId);
  } else {
    user.bookmarks.push(contestId);
  }

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { isBookmarked: !isBookmarked },
        "Bookmark toggled successfully"
      )
    );
});

export {
  retrieveContests,
  getUpcomingContests,
  getPastContests,
  toggleBookmark,
};
