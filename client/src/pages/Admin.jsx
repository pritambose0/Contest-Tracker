import { useEffect, useState } from "react";
import { fetchUpcomingContests, addSolution } from "../services/api";
import AdminNavbar from "../components/Navbar";

const Admin = () => {
  const [contests, setContests] = useState([]);
  const [selectedContest, setSelectedContest] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  useEffect(() => {
    const loadContests = async () => {
      const data = await fetchUpcomingContests();
      setContests(data);
    };
    loadContests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedContest || !youtubeLink) return;

    await addSolution(selectedContest, youtubeLink);
    alert("Solution added successfully!");
    setYoutubeLink("");
  };

  return (
    <div className="p-4">
      <AdminNavbar />
      <h2 className="text-xl font-bold mb-4">Attach YouTube Solution</h2>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-white dark:bg-gray-800"
      >
        <label className="block mb-2">Select Contest:</label>
        <select
          value={selectedContest}
          onChange={(e) => setSelectedContest(e.target.value)}
          className="p-2 w-full border rounded mb-3"
        >
          <option value="">-- Select --</option>
          {contests.map((contest) => (
            <option key={contest._id} value={contest._id}>
              {contest.name}
            </option>
          ))}
        </select>

        <label className="block mb-2">YouTube Link:</label>
        <input
          type="text"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="Enter YouTube solution link"
          className="p-2 w-full border rounded mb-3"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Solution
        </button>
      </form>
    </div>
  );
};

export default Admin;
