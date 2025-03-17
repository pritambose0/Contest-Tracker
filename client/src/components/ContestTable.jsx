import React, { useState } from "react";
import { toggleBookmarkContest } from "../services/api";
import formatTimeRemaining from "../utils/timeRemaining";

const ContestTable = ({ contest, setSelectedContest, showTimeRemaining }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleToggleBookmark = async (contestId) => {
    const toggle = await toggleBookmarkContest(contestId);
    if (toggle) {
      setIsBookmarked(toggle.isBookmarked);
    }
  };
  return (
    <>
      <tr className="border-b border-gray-700 hover:bg-gray-700 transition-all">
        <td className="p-2 sm:p-3 border border-gray-700">
          <button
            className="cursor-pointer text-blue-400 hover:underline text-start"
            onClick={() => setSelectedContest(contest)}
          >
            {contest.name}
          </button>
        </td>
        <td className="p-2 sm:p-3 border border-gray-700 text-white">
          {contest.platform}
        </td>
        <td className="p-2 sm:p-3 border border-gray-700 text-gray-300">
          {new Date(contest.startTime).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </td>
        {showTimeRemaining && (
          <td className="p-2 sm:p-3 border border-gray-700 text-gray-300">
            {formatTimeRemaining(contest.startTime)}
          </td>
        )}
        <td className="p-2 sm:p-3 border border-gray-700 text-gray-300">
          {contest.duration} min
        </td>
        <td className="p-2 sm:p-3 border border-gray-700">
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-all hover:underline"
          >
            View
          </a>
        </td>
        <td className="p-2 sm:p-3 border border-gray-700 text-gray-300 ">
          <button
            className={`px-3 py-1 rounded gap-1 transition cursor-pointer ${
              isBookmarked || contest.isBookmarked
                ? "bg-red-600 hover:bg-red-700 transition-all duration-300"
                : "bg-green-600 hover:bg-green-700 transition-all duration-300"
            }`}
            onClick={() => handleToggleBookmark(contest._id)}
          >
            {isBookmarked || contest.isBookmarked ? "Unbookmark" : "Bookmark"}
          </button>
        </td>
      </tr>
    </>
  );
};

export default ContestTable;
