import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
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
  return (
    <div>
        <h1 className="text-center text-3xl pt-8 font-bold text-yellow-400">
        JOBIFY
      </h1>
      <h1 className="text-center text-xl pt-2 text-red-200">
        Crack Job with AI
      </h1>
       <div className='ml-36'>
      <h1 className="text-3xl mt-8 font-bold text-gray-200">
        Hi, <span className="text-blue-600">{user.name}</span> 👋
      </h1>

      <p className="mt-4 text-gray-50">
        Welcome to Jobify dashboard
      </p>
    </div>
      <div className="flex justify-center gap-12 mt-20 px-10">
  
  {/* Card 1 */}
  <div className="
    w-82 h-72 
    bg-white 
    rounded-2xl 
    border-2 border-gray-200 
    shadow-xl 
    p-6 
    flex flex-col justify-between 
    hover:scale-105 
    hover:shadow-2xl 
    transition-all duration-300
  ">
    <div >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Resume Analyzer
      </h2>
      <p className="text-gray-600">
        Upload your resume and get AI-powered feedback instantly.
      </p>
    </div>
    <button onClick={() => navigate("/resume-analyzer")} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
      Open Tool →
    </button>
  </div>

  {/* Card 2 */}
  <div className="
    w-82 h-82 
    bg-white 
    rounded-2xl 
    border-2 border-gray-200 
    shadow-xl 
    p-6 
    flex flex-col justify-between 
    hover:scale-105 
    hover:shadow-2xl 
    transition-all duration-300
  ">
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Interview Coach
      </h2>
      <p className="text-gray-600">
        Practice interviews with AI and improve your confidence.
      </p>
    </div>
    <button onClick={() => navigate("/interviewer")} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
      Start Practice →
    </button>
  </div>

 
</div>

    </div>
  )
}

export default Home

