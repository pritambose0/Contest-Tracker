import { useEffect, useState } from "react";
import { addSolution, getAllSolutions } from "../services/api";
import { motion } from "framer-motion";

const getYoutubeId = (url) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/|.*v%3D|.*vi=|vi\/))([^?&\n]+)/
  );
  return match ? match[1] : null;
};

const ContestModal = ({ contest, isAdmin, onClose }) => {
  const [solutionLink, setSolutionLink] = useState("");
  const [solutions, setSolutions] = useState(contest.solutions || []);

  useEffect(() => {
    async function getSolutions() {
      setSolutions(await getAllSolutions(contest._id));
    }
    getSolutions();
  }, []);

  const handleAddSolution = async () => {
    if (solutionLink.trim()) {
      await addSolution(contest._id, solutionLink);
      setSolutions([...solutions, solutionLink]);
      setSolutionLink("");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-md z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] sm:w-1/2 shadow-lg">
        <h2 className="text-xl font-bold">{contest.name}</h2>
        <p className="text-xl font-semibold text-green-400">
          {contest.platform}
        </p>
        <p className="mt-2">
          <strong>Date: </strong>
          {new Date(contest.startTime).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <p>
          <strong>Duration: </strong> {contest.duration} min
        </p>
        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline mt-2 block"
        >
          View Contest
        </a>

        {/* Solutions List */}
        <h3 className="mt-4 font-semibold">Solutions</h3>
        {solutions?.length > 0 ? (
          <div className="grid gap-3 mt-2">
            {solutions.map((sol, index) => {
              const videoId = getYoutubeId(sol.youtubeLink);
              return (
                <div
                  key={index}
                  className="bg-gray-800 p-3 rounded-lg shadow-md"
                >
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={`Solution ${index + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded aspect-video w-full"
                    ></iframe>
                  ) : (
                    <a
                      href={sol.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 font-semibold hover:underline"
                    >
                      Solution {index + 1}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-orange-400">No solutions added yet.</p>
        )}

        {/* Admin Section */}
        {isAdmin && (
          <div className="mt-4">
            <h3 className="font-semibold">Add Solution</h3>
            <input
              type="text"
              className="w-full p-2 mt-2 bg-gray-800 border border-gray-600 rounded"
              placeholder="Enter solution link..."
              value={solutionLink}
              onChange={(e) => setSolutionLink(e.target.value)}
            />
            <button
              onClick={handleAddSolution}
              className="mt-2 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Solution
            </button>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default ContestModal;
