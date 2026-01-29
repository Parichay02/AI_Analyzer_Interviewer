from fastapi import FastAPI, UploadFile, File, Form
import shutil
import os
from pydantic import BaseModel
from services.interviewer import next_question

from services.pdf_to_text import pdf_to_text

from services.nlp_logic import calculate_ats

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def root():
    return {"status": "FastAPI running"}


@app.post("/compare-resume-jd")
async def compare_resume_jd(
    resume: UploadFile = File(...),              # PDF file
    job_description: str = Form(...)              # TEXT input
):
    # Save resume PDF
    resume_path = os.path.join(UPLOAD_DIR, resume.filename)

    with open(resume_path, "wb") as f:
        shutil.copyfileobj(resume.file, f)

    # Convert resume PDF to text
    resume_text = pdf_to_text(resume_path)

    # JD is already text
    jd_text = job_description

    # NLP logic
    result = calculate_ats(resume_text, jd_text)

    return result


class InterviewRequest(BaseModel):
    answer: str
    role: str = "SDE"

@app.post("/interview")
def interview(req: InterviewRequest):
    return next_question(req.answer, req.role)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
