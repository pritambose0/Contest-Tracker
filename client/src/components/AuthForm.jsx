import { useState } from "react";
import { motion } from "framer-motion";
import { createUser, loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const AuthForm = ({ type }) => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (
        (type === "signup" && !user.username) ||
        !user.email ||
        !user.password
      ) {
        return;
      }
      const response =
        type === "login" ? await loginUser(user) : await createUser(user);

      if (response && type === "login") {
        dispatch(login(response));
        navigate("/dashboard");
      } else if (response && type === "signup") {
        alert("User created successfully!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data.message);
      console.log(err);
    }
  };

  const testUserCredentials = {
    username: "pritambose0",
    email: "test@gmail.com",
    password: "test123",
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-gray-800 shadow-lg rounded-xl"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-semibold text-center text-white">
        {type === "login" ? "Login" : "Sign Up"}
      </h2>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        {type === "signup" && (
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer">
          {type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        onClick={() => navigate(type === "login" ? "/signup" : "/login")}
        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer mt-4"
      >
        {type === "login"
          ? "Don't have an account? Sign up"
          : "Already have an account? Login"}
      </button>

      <button
        onClick={() => setUser(testUserCredentials)}
        className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition duration-300 cursor-pointer mt-4"
      >
        Test Login
      </button>
    </motion.div>
  );
};

export default AuthForm;
