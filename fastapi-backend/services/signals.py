from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import json

llm = ChatOpenAI(
    model="gpt-4o-mini",
    openai_api_key="xxxx"
    temperature=0
)

prompt = ChatPromptTemplate.from_template("""
You are a strict technical interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer on THREE metrics.

Definitions:
- confidence: certainty, assertiveness, clarity (0 = very unsure)
- hesitation: uncertainty, fillers, doubt (1 = very hesitant)
- correctness: technical accuracy (0 = wrong, 1 = fully correct)

Rules:
- Scores must be between 0 and 1.
- If answer is "I don't know", correctness = 0.0
- Return ONLY valid JSON

JSON format:
{{
  "confidence": number,
  "hesitation": number,
  "correctness": number
}}
""")

def evaluate_answer_llm(question: str, answer: str) -> dict:
    response = llm.invoke(
        prompt.format_messages(
            question=question,
            answer=answer
        )
    )

    try:
        data = json.loads(response.content)
        return {
            "confidence": round(float(data["confidence"]), 2),
            "hesitation": round(float(data["hesitation"]), 2),
            "correctness": round(float(data["correctness"]), 2),
        }
    except Exception:
        return {
            "confidence": 0.0,
            "hesitation": 1.0,
            "correctness": 0.0,
        }
