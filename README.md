# Full Stack AI-Integrated Web Application 🚀

## Tech Stack
- React + TailwindCSS
- React Router (BrowserRouter)
- Node.js + Express
- FastAPI (Python)
- MySQL
- Docker & Docker Compose
- OpenAI GPT-4 Mini
- TF-IDF + Cosine Similarity (Resume Analyzer)

## Features
- Secure authentication with hashed passwords (bcrypt)
- REST APIs for Node & FastAPI integration
- AI Interviewer using LLM
- Resume Analyzer using NLP similarity
- Fully containerized using Docker Compose

## Problems Faced & Solutions
- ❌ MySQL connection issues → solved using Docker network aliases
- ❌ BrowserRouter refresh errors → fixed with proper server config
- ❌ CLI & dependency errors → resolved by version pinning
- ❌ FastAPI ↔ Node API integration → standardized API datapoints

## How to Run Locally
Edit the mysql passwords corresponding to your system and docker files likewise.
```bash
docker compose up --build

