import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import App from "./App";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import ResumeAnalyzer from "./Pages/ResumeAnalyzer";
import Interviewer from "./Interviewer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup  />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/resume-analyzer" element={<ResumeAnalyzer/>} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route path="/interviewer" element={<Interviewer/>} />
    </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);

