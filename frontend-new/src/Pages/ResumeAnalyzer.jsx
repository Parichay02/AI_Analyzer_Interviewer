import React, { useState } from "react";
import axios from "axios";
import ATSResult from "./ATSResult";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ResumeAnalyzer = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

   const navigate = useNavigate();
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
  
      if (!storedUser) {
        // ❌ not logged in → redirect
        navigate("/login");
      } else {
        setUser(JSON.parse(storedUser));
      }
    }, [navigate]);
  
    if (!user) return null;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!resume || !jobDescription) {
      setError("Resume and Job Description are required");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume); // ⚠️ must match multer field
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/compare-resume-jd",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.detail ||
          "Analysis failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div class="absolute top-0 left-0 ml-4 mt-4">
          <h1 className="text-left text-2xl pt-8 font-bold text-yellow-400">
        JOBIFY
      </h1>
      <h1 className="text-left text-l pt-2 text-red-200">
        Crack Job with AI
      </h1>
      
      </div>
      <div className="absolute top-0 right-0 mr-4 mt-4">
        
         <h1 className="text-2xl mt-8 font-bold text-gray-200">
      <span className="text-blue-600">{user.name}</span>
      </h1>
      <button className="text-bold text-white mr-8 bg-red-600 px-4 py-2 text-2xl hover:bg-red-800 rounded" onClick={() => navigate("/home")}>← Back</button>
      </div>
  <div className="w-full m-8">

    {/* HEADER */}
    <h1 className="text-3xl md:text-4xl mt-8 font-bold text-center text-yellow-300 mb-8 tracking-wide">
      Resume Analyzer
    </h1>

    {/* CARD */}
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-xl bg-white/90 border border-blue-300/50 p-8 rounded-2xl shadow-2xl space-y-6"
    >

      {/* FILE INPUT */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Upload Resume (PDF)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          className="w-full file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700
                     text-sm text-gray-600 cursor-pointer"
        />
      </div>

      {/* JD INPUT */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          rows="6"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full border border-gray-300 p-4 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     resize-none text-sm"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold text-white transition-all
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
          }`}
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>

      {/* ERROR */}
      {error && (
        <p className="text-red-600 text-sm text-center font-medium">
          {error}
        </p>
      )}
    </form>

    {/* RESULT */}
    {result && (
      <div className="mt-10 bg-white rounded-2xl shadow-xl p-6">
        <ATSResult data={result} />
      </div>
    )}
  </div>
</div>

  );
};

export default ResumeAnalyzer;
