import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import  db  from "./db.js";
import axios from "axios";  
import multer from "multer";
import FormData from "form-data";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  // Check existing user
  const [rows] = await db.execute(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (rows.length > 0) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  await db.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );

  res.status(201).json({
    success: true,
    message: "Signup successful",
  });
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // check user
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // success
    res.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/compare-resume-jd",  upload.single("resume"), async (req, res) => {
  try {
    const resumeFile = req.file;
    const jdText = req.body.job_description;

    
  console.log("FILES:", req.files);
  console.log("BODY:", req.body);
    if (!resumeFile) {
      return res.status(400).json({ error: "Resume file is required" });
    }
    const formData = new FormData();
    formData.append("resume", fs.createReadStream(resumeFile.path));
    formData.append("job_description", jdText);
   
       const response = await axios.post(
      "http://fastapi-backend:8080/compare-resume-jd",
       formData,
      { headers: formData.getHeaders(),
        timeout: 20000 }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Axios error details:");
    
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      return res.status(500).json({
        error: "FastAPI responded with error",
        details: error.response.data
      });
    }

    if (error.request) {
      console.error("No response from FastAPI");
      return res.status(500).json({
        error: "FastAPI not reachable"
      });
    }

    console.error("Message:", error.message);
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/interview", async (req, res) => {
  try {
    const { answer, role } = req.body;

    if (!answer || !role) {
      return res.status(400).json({
        error: "answer and role are required"
      });
    }

    const response = await axios.post(
      "http://fastapi-backend:8080/interview",
      {
        answer,
        role
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res.json(response.data);

  } catch (error) {
    console.error("Axios error:");

    if (error.response) {
      return res.status(error.response.status).json({
        error: "FastAPI error",
        details: error.response.data
      });
    }

    if (error.request) {
      return res.status(500).json({
        error: "FastAPI not reachable"
      });
    }

    return res.status(500).json({
      error: error.message
    });
  }
});
const PORT =  5000;
app.listen(PORT, () => {
  console.log(`🚀 Node server running on http://localhost:${PORT}`);
});