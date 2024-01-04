import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ExperimentProvider } from "./components/experiment-provider.tsx";
import { IUser, UserProvider } from "./components/user-provider.tsx";
import "./index.css";
import { HomePage } from "./pages/home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

/**
 * This is a mock experiment definitions.
 * In a real world scenario, this would be fetched from our experiment back-end.
 */
const url: string =
  "https://gist.githubusercontent.com/ptessier/131033ea219080774bd6c44efeeeaea1/raw/2b8dd1818616a3bd121dbed17848bde3bbbb4213/experiment-definition.json";

/**
 * This is a mock user.
 * In a real world scenario, this would be fetched from storage or from our identity provider.
 */
const user: IUser = {
  id: "1",
  // ... other user properties
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider user={user}>
      <ExperimentProvider url={url}>
        <RouterProvider router={router} />
      </ExperimentProvider>
    </UserProvider>
  </React.StrictMode>
);
