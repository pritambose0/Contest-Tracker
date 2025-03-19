import axios from "axios";

export const createUser = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users`,
      user
    );
    return response.data.data;
  } catch (error) {
    console.log("Create User Error: ", error);
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/login`,
      user,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("Login User Error: ", error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/logout`,
      {},
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("Logout User Error: ", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/users/current-user`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("Get Current User Error: ", error);
  }
};

export const fetchUpcomingContests = async (platform) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/contests/upcoming`,
      {
        params: { platform },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("Fetch Upcoming Contests Error: ", error);
  }
};

export const fetchPastContests = async (platform) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/contests/past`,
      {
        params: { platform },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log("Fetch Upcoming Contests Error: ", error);
  }
};

export const fetchBookmarkedContests = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/users/me/bookmarks`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("Fetch Bookmarked Contests Error: ", error);
  }
};

export const toggleBookmarkContest = async (contestId) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/contests/${contestId}/bookmark`,
      {},
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("Bookmark Contest Error: ", error);
  }
};

export const addSolution = async (contestId, youtubeLink) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/${contestId}/solution`,
      { youtubeLink },
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("Add Solution Error: ", error);
  }
};

export const deleteSolution = async (contestId, solutionId) => {
  try {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/${contestId}/solutions/${solutionId}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.log("Add Solution Error: ", error);
  }
};

export const getAllSolutions = async (contestId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/${contestId}/solutions`
    );
    return response.data.data;
  } catch (error) {
    console.log("Get All Solutions Error: ", error);
  }
};
