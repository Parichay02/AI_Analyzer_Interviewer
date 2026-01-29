import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
const App = () => {
  return (
    <div className='bg-black'>
     
    <h1 className="text-center text-3xl pt-8 font-bold text-yellow-400">
      JOBIFY
    </h1>
    <h1 className="text-center text-xl pt-2  text-red-200">
      Crack Job with AI
    </h1>
    <div className='flex flex-col '>
    <div class="flex">
    <div class="w-1/2 p-8">
       <Link to="/signup">
       <button
        class="bg-blue-600 hover:bg-blue-700 text-white mb-8 font-bold py-4 px-5 rounded"
        onclick="window.location.href='/signup'"
      >
       
        Get Started
      </button>
        </Link>
    
      <h2 class="text-2xl font-bold mt-8 mb-4 text-white">Welcome to Jobify</h2>
      <p class="mb-4 text-white">
        Jobify is your ultimate AI-powered job application assistant. Our platform leverages cutting-edge artificial intelligence to help you craft personalized cover letters and resumes that stand out to employers.
      </p>
      <p class="mb-4 text-white">
        Whether you're a recent graduate or a seasoned professional, Jobify tailors your application materials to match the job description, increasing your chances of landing an interview.
      </p>
      <p class="mb-4 text-white">
        Join thousands of successful job seekers who have transformed their job search with Jobify. Sign up today and take the first step towards your dream career!
      </p>
    </div>
    <div class="w-1/2 p-8">
      <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8am9ifGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60" alt="Job Search" class="rounded-lg shadow-lg mx-auto" />

    </div>

    
  </div>

    <div className='flex'>
      <div class="w-1/2 p-8">
      <img src="https://p-gpb8fhd4b9fbh6fy.z01.azurefd.net/cms/60aa6b0b-dc05-4bf6-90eb-e44cc1963ca8/9b23ed72-fa7c-45d1-a82f-107c5382a845-lg.jpg
" alt="How It Works" class="rounded-lg shadow-lg mx-auto" />
      </div>
      <div class="w-1/2 p-8">
      <h2 class="text-2xl font-bold mb-4 text-white">How It Works</h2>
      <p class="mb-4 text-white">
        1. Sign Up: Create your free account on Jobify and complete your profile with your skills, experience, and career goals.
      </p>
      <p class="mb-4 text-white">
        2. Job Search: Browse our extensive database of job listings or upload your own job descriptions.
      </p>
      <p class="mb-4 text-white">
        3. AI-Powered Interviewer: Our advanced AI analyzes your interview responses and provides personalized feedback to help you improve your performance.
      </p>
      <p class="mb-4 text-white">
        4. Review & Edit: Preview the generated documents, make any desired edits, and download them in your preferred format.
      </p>
      <p class="mb-4 text-white">
        5. Apply with Confidence: Submit your polished application materials and increase your chances of landing interviews.
      </p>
    </div>
    </div>

    <div className='flex'>
    <div class="w-1/2 p-8">
      <h2 class="text-2xl font-bold mb-4 text-white">Why Choose Jobify?</h2>
      <p class="mb-4 text-white">
        Personalized Applications: Stand out with cover letters and resumes tailored to each job.
      </p>
      <p class="mb-4 text-white">
        Time-Saving: Generate professional documents in minutes, not hours.
      </p>
      <p class="mb-4 text-white">
        Expertly Crafted: Benefit from AI trained on thousands of successful applications.
      </p>
      <p class="mb-4 text-white">
        User-Friendly: Easy-to-use interface designed for job seekers of all experience levels.
      </p>
      <p class="mb-4 text-white">
        Affordable: Access premium features at a fraction of the cost of traditional career services.
      </p>
       <Link to="/signup">
       <button
        class="bg-blue-600 hover:bg-blue-700 text-white mt-8 font-bold py-4 px-5 rounded"
        onclick="window.location.href='/signup'"
      >
       
        Get Started
      </button>
        </Link>
        
    </div>
    <div class="w-1/2 p-8">
      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvb3NpbmclMjBqb2J8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" alt="Why Choose Us" class="rounded-lg shadow-lg mx-auto" />  
      </div>
    </div>
    </div>

    </div>
  )
}

export default App
