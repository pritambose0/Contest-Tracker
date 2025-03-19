import { motion } from "framer-motion";

const BookmarkModal = ({ bookmarks, onClose }) => {
  console.log("Bookmarks: ", bookmarks);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-md z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-gray-900 text-white p-6 rounded-lg w-[90%] sm:w-1/2">
        <h2 className="text-xl font-bold mb-4">Bookmarked Contests</h2>

        {bookmarks?.length > 0 ? (
          <ul className="space-y-2">
            {bookmarks.map((contest, index) => (
              <li key={index} className="bg-gray-800 p-3 rounded-lg">
                <h3 className="text-lg font-semibold">{contest.name}</h3>
                <p className="text-green-400">{contest.platform}</p>
                <a
                  href={contest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline block mt-1 cursor-pointer"
                >
                  View Contest
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-orange-400">No bookmarks added yet.</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default BookmarkModal;
