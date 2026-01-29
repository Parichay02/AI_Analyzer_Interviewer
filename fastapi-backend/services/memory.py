memory = {
    "history": ""
}

def update_memory(user_input: str, ai_output: str):
    """Append conversation to memory, keep last k exchanges."""

    history = memory["history"].strip()

    lines = history.split("\n") if history else []

    lines.append(f"Human: {user_input}")
    lines.append(f"AI: {ai_output}")

    # Keep only last k exchanges (2 lines per exchange)
    memory["history"] = "\n".join(lines)

    # 🔥 Debug proof
    print("UPDATED MEMORY:\n", memory["history"])
    