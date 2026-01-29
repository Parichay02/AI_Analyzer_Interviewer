import pdfplumber
import pytesseract
from pdf2image import convert_from_path


def extract_text_pdf(pdf_path: str) -> str:
    text = []

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text.append(page_text)

    return "\n".join(text).strip()


def extract_text_ocr(pdf_path: str) -> str:
    images = convert_from_path(pdf_path, dpi=300)
    ocr_text = []

    for img in images:
        text = pytesseract.image_to_string(img)
        if text:
            ocr_text.append(text)

    return "\n".join(ocr_text).strip()


def pdf_to_text(pdf_path: str) -> str:
    """
    Step 1: Try normal PDF extraction
    Step 2: If text is empty/too small → OCR fallback
    """
    text = extract_text_pdf(pdf_path)

    # Heuristic: scanned PDFs usually return very little text
    if len(text) < 50:
        print("⚠️ Low text detected, switching to OCR...")
        text = extract_text_ocr(pdf_path)

    return text
