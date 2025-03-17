import { Outlet } from "react-router-dom";
import { getCurrentUser } from "./services/api";
import { login, logout } from "./store/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);
  // console.log("userStatus", userStatus);

  useEffect(() => {
    async function checkUserStatus() {
      const user = await getCurrentUser();
      if (user) {
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    }
    checkUserStatus();
  }, [dispatch, userStatus]);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <Outlet />
      </div>
    </>
  );
};

export default App;
