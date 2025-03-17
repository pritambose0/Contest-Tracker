import { motion } from "framer-motion";
import { toggleBookmarkContest } from "../services/api";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";

const ContestCard = ({ contest }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    toggleBookmarkContest(contest.id);
    setBookmarked(!bookmarked);
  };

  return (
    <motion.div
      className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-2xl transition-all border border-white/20"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-xl font-semibold text-white">{contest.name}</h3>
      <p className="text-sm text-gray-300">{contest.platform}</p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handleBookmark}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
        >
          {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </motion.div>
  );
};

export default ContestCard;
