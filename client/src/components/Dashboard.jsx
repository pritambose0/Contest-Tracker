import { useEffect, useState } from "react";
import {
  fetchUpcomingContests,
  fetchPastContests,
  logoutUser,
  fetchBookmarkedContests,
} from "../services/api";
import ContestModal from "./ContestModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContestTable from "./ContestTable";
import SkeletonLoader from "./SkeletonLoading";
import { logout } from "../store/authSlice";
import BookmarkModal from "./BookmarkModal";

const Dashboard = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const [selectedContest, setSelectedContest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [platformFilter, setPlatformFilter] = useState("All");
  const [isBookmarkModalOpen, setBookmarkModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  const userData = useSelector((state) => state.auth.userData);
  const userStatus = useSelector((state) => state.auth.status);
  // console.log("userData", userData);

  const isAdmin = userData?.role === "admin";

  useEffect(() => {
    async function loadContests() {
      setUpcoming(await fetchUpcomingContests());
      setPast(await fetchPastContests());
      setBookmarks(await fetchBookmarkedContests());
      setLoading(false);
    }
    loadContests();
  }, [isBookmarkModalOpen]);

  const contestsPerPage = 10;
  const filterContests = (contests) => {
    return platformFilter === "All"
      ? contests
      : contests.filter((contest) => contest.platform === platformFilter);
  };

  const paginate = (contests, page) => {
    const startIndex = (page - 1) * contestsPerPage;
    return contests?.slice(startIndex, startIndex + contestsPerPage);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response) {
      dispatch(logout());
      navigate("/login");
    }
  };
  // console.log("Contests", upcoming);

  const handleBookmarkClick = () => {
    setBookmarkModalOpen(true);
  };

  return loading ? (
    <div className="text-xl text-white w-full">
      <SkeletonLoader />
    </div>
  ) : (
    <div className=" p-6 w-full">
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Contest Tracker
      </h1>

      {/* Platform Filter */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mb-4">
        <select
          value={platformFilter}
          onChange={(e) => setPlatformFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
        >
          {["All", "LeetCode", "Codeforces", "CodeChef"].map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 transition duration-300 text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleBookmarkClick}
          >
            Bookmarks
          </button>

          {userStatus ? (
            <button
              className="bg-red-500 hover:bg-red-700 transition duration-300 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 transition duration-300 text-white px-4 py-2 rounded cursor-pointer "
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Upcoming Contests */}
      <h2 className="text-xl sm:text-2xl font-semibold text-white border-b border-gray-600 pb-2">
        Upcoming Contests
      </h2>
      <div className="text-sm sm:text-[16px] overflow-x-auto mt-4 bg-gray-800 shadow-lg rounded-lg p-2 sm:p-4">
        <table className="w-full border-collapse text-white min-w-[600px] sm:min-w-full">
          <thead className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300">
            <tr>
              <th className="p-3 border border-gray-700 text-left">Name</th>
              <th className="p-3 border border-gray-700 text-left">Platform</th>
              <th className="p-3 border border-gray-700 text-left">Date</th>
              <th className="p-3 border border-gray-700 text-left">
                Time Remaining
              </th>
              <th className="p-3 border border-gray-700 text-left">Duration</th>
              <th className="p-3 border border-gray-700 text-left">Link</th>
              <th className="p-3 border border-gray-700 text-left">Bookmark</th>
            </tr>
          </thead>
          <tbody>
            {filterContests(upcoming)?.length === 0 ? (
              <tr className="border-b border-gray-700 hover:bg-gray-700 transition-all">
                <td
                  colSpan="7"
                  className="p-2 sm:p-3 border border-gray-700 text-center text-orange-400 font-semibold"
                >
                  No Upcoming Contests
                </td>
              </tr>
            ) : (
              paginate(filterContests(upcoming), upcomingPage)?.map(
                (contest) => (
                  <ContestTable
                    contest={contest}
                    key={contest._id}
                    setSelectedContest={setSelectedContest}
                    showTimeRemaining
                  />
                )
              )
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between text-white">
          <button
            onClick={() => setUpcomingPage((prev) => Math.max(prev - 1, 1))}
            disabled={upcomingPage === 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <span className="text-gray-300">Page {upcomingPage}</span>
          <button
            onClick={() =>
              setUpcomingPage((prev) =>
                prev * contestsPerPage < filterContests(upcoming)?.length
                  ? prev + 1
                  : prev
              )
            }
            disabled={
              upcomingPage * contestsPerPage >= filterContests(upcoming)?.length
            }
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      </div>

      {/* Past Contests */}
      <h2 className="text-2xl font-semibold text-white border-b border-gray-600 pb-2 mt-8">
        Past Contests
      </h2>
      <div className="overflow-x-auto mt-4 bg-gray-800 shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse text-white min-w-[600px] sm:min-w-full">
          <thead className="bg-gradient-to-r from-gray-700 to-gray-900 text-gray-300">
            <tr>
              <th className="p-3 border border-gray-700 text-left">Name</th>
              <th className="p-3 border border-gray-700 text-left">Platform</th>
              <th className="p-3 border border-gray-700 text-left">Date</th>
              <th className="p-3 border border-gray-700 text-left">Duration</th>
              <th className="p-3 border border-gray-700 text-left">Link</th>
              <th className="p-3 border border-gray-700 text-left">Bookmark</th>
            </tr>
          </thead>
          <tbody>
            {paginate(filterContests(past), pastPage)?.map((contest) => (
              <ContestTable
                contest={contest}
                key={contest._id}
                setSelectedContest={setSelectedContest}
                showTimeRemaining={false}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between text-white">
        <button
          onClick={() => setPastPage((prev) => Math.max(prev - 1, 1))}
          disabled={pastPage === 1}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>
        <span className="text-gray-300">Page {pastPage}</span>
        <button
          onClick={() =>
            setPastPage((prev) =>
              prev * contestsPerPage < past?.length ? prev + 1 : prev
            )
          }
          disabled={pastPage * contestsPerPage >= past?.length}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all"
        >
          Next
        </button>
      </div>

      {selectedContest && (
        <ContestModal
          contest={selectedContest}
          onClose={() => setSelectedContest(null)}
          isAdmin={isAdmin}
        />
      )}

      {isBookmarkModalOpen && (
        <BookmarkModal
          bookmarks={bookmarks}
          onClose={() => setBookmarkModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
