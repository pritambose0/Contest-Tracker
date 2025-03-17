import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { SolutionSchema } from "../models/solution.model.js";
import { ContestSchema } from "../models/contest.model.js";
import axios from "axios";

const PLAYLISTS = {
  Codeforces: process.env.CODEFORCES_PLAYLIST_ID,
  CodeChef: process.env.CODECHEF_PLAYLIST_ID,
};

const addSolution = asyncHandler(async (req, res) => {
  const { contestId } = req.params;
  const { youtubeLink } = req.body;

  if (!contestId || !youtubeLink) {
    throw new ApiError(400, "All fields are required");
  }

  const solution = await SolutionSchema.create({
    contest: contestId,
    youtubeLink,
  });

  if (!solution) {
    throw new ApiError(400, "Solution creation failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, solution, "Solution added successfully"));
});

const deleteSolution = asyncHandler(async (req, res) => {
  const { solutionId } = req.params;

  const solution = await SolutionSchema.findByIdAndDelete(solutionId);

  if (!solution) {
    throw new ApiError(400, "Solution not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, solution, "Solution deleted successfully"));
});

const getAllSolutions = asyncHandler(async (req, res) => {
  const { contestId } = req.params;

  const solutions = await SolutionSchema.find({ contest: contestId });

  return res
    .status(200)
    .json(
      new ApiResponse(200, solutions || [], "Solutions fetched successfully")
    );
});

const fetchVideosFromPlaylist = async (playlistId) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: "snippet",
          maxResults: 20,
          playlistId: playlistId,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    return response.data.items.map((video) => ({
      title: video.snippet.title,
      videoId: video.snippet.resourceId.videoId,
    }));
  } catch (error) {
    console.error(` Failed to fetch videos:`, error?.message);
    return [];
  }
};

const cleanVideoTitle = (title) => {
  return title.split("|")[0].trim();
};

const updateSolutionLink = async (_, __) => {
  try {
    for (const [platform, playlistId] of Object.entries(PLAYLISTS)) {
      const videos = await fetchVideosFromPlaylist(playlistId);

      for (const video of videos) {
        const cleanedTitle = cleanVideoTitle(video.title).toLowerCase();

        const contest = await ContestSchema.findOne({
          platform,
          name: { $regex: new RegExp(cleanedTitle.replace(/\s+/g, ".*"), "i") },
        });

        if (!contest) {
          continue;
        }

        const existingSolution = await SolutionSchema.findOne({
          contest: contest._id,
        });

        if (existingSolution) {
          continue;
        }

        const newSolution = await SolutionSchema.create({
          contest: contest?._id,
          youtubeLink: `https://www.youtube.com/watch?v=${video.videoId}`,
        });

        if (!newSolution) {
          throw new ApiError(400, "Solution creation failed");
        }
      }
    }
  } catch (error) {
    console.log(`Failed to update solutions:`, error?.message);
  }
};

export { addSolution, getAllSolutions, deleteSolution, updateSolutionLink };
