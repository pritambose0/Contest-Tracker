import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Protected from "./components/Protected.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AuthForm from "./components/AuthForm.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication={false}>
            <Navigate to="/dashboard" />
          </Protected>
        ),
      },
      {
        path: "login",
        element: (
          <Protected authentication={false}>
            <AuthForm type="login" />
          </Protected>
        ),
      },
      {
        path: "signup",
        element: (
          <Protected authentication={false}>
            <AuthForm type="signup" />
          </Protected>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Protected authentication={false}>
            <Dashboard />
          </Protected>
        ),
      },
      { path: "*", element: <h2 className="text-center">404 Not Found</h2> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
