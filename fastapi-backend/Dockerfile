FROM python:3.11-slim

WORKDIR /app

# System dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    poppler-utils \
    libgl1 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip first
RUN python -m pip install --upgrade pip

# Core web stack
RUN pip install --no-cache-dir \
    fastapi \
    uvicorn[standard] \
    pydantic \
    python-multipart

# OCR + ML stack
RUN pip install --no-cache-dir \
    pdfplumber \
    pytesseract \
    pdf2image \
    scikit-learn \
    numpy \
    pandas \
    regex \
    python-docx \
    Pillow \
    opencv-python-headless

# LLM / LangChain stack
RUN pip install --no-cache-dir \
    langchain-openai \
    langchain-core \
    langchain-classic \
    openai

# Database
RUN pip install --no-cache-dir \
    mysql-connector-python

# Copy app code
COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
