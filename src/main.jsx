import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Global Components
import Navigator from "./components/globals/Navigator";

// Route Imports
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./routes/Search";
import Saved from "./routes/Saved";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/saved",
    element: <Saved />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {routes.map((r, i) => (
        <Route key={i} path={r.path} element={r.element} />
      ))}
    </Routes>
    <Navigator />
  </BrowserRouter>
);
