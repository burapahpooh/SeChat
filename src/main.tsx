import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Login, { loginUser } from "./Login.tsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div>Hello world!</div>,
//   },
// ]);

export var root: any = null;

//trigger DOMContentLoaded was called twice and this is the solution JUST call only one
document.addEventListener("DOMContentLoaded", function () {
  if (root == null) {
    root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
    appPortal();
  } else {
    appPortal();
  }
});

export function appPortal() {
  root?.render(
    <React.StrictMode>
      {loginUser == null || loginUser == undefined ? <Login /> : <App />}
    </React.StrictMode>
  );
}
