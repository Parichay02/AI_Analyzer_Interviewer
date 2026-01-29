from services.llm_chain import interview_chain
from services.memory import update_memory, memory
from services.signals import evaluate_answer_llm

def next_question(user_answer: str, role: str):

    # 1️⃣ Default values for first turn
    confidence = 0.0
    hesitation = 0.0
    correctness = 0.0

    # 2️⃣ Ask next question
    ai_response = interview_chain.run({
        "input": user_answer,
        "history": memory["history"],
        "confidence": confidence,
        "hesitation": hesitation,
        "role": role,
        "correctness": correctness
    })

    # 3️⃣ Evaluate the USER answer (NOT AI response)
    evaluation = evaluate_answer_llm(ai_response,user_answer)

    confidence = evaluation["confidence"]
    hesitation = evaluation["hesitation"]
    correctness = evaluation["correctness"]

    # 4️⃣ Update memory AFTER evaluation
    update_memory(user_answer, ai_response)

    return {
        "question": ai_response,
        "correctness": correctness,
        "confidence": confidence,
        "hesitation": hesitation
    }
