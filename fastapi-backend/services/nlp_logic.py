# ats_service.py

import string
from collections import Counter

# Simple list of stopwords (you can expand)
STOPWORDS = set([
    "a", "an", "the", "and", "or", "in", "on", "for", "with", "to", "of", "by", "at", "from"
])

# Optional skill categories for UI decoration
SKILL_CATEGORIES = {
    "Programming": ["python", "java", "c++", "javascript", "nodejs", "react", "html", "css", "sql"],
    "Machine Learning": ["machinelearning", "ml", "tensorflow", "keras", "pytorch", "sklearn"],
    "Backend": ["express", "django", "flask", "spring", "nodejs", "mysql", "postgresql"],
    "Frontend": ["react", "vue", "angular", "html", "css", "javascript"],
    "Data": ["sql", "nosql", "mongodb", "pandas", "numpy", "data", "analysis"]
}

def simple_tokenize(text):
    """Tokenizes text into words without NLTK"""
    text = text.lower()
    # Remove punctuation
    text = text.translate(str.maketrans("", "", string.punctuation))
    # Split by spaces
    tokens = text.split()
    # Remove stopwords
    tokens = [word for word in tokens if word not in STOPWORDS]
    return tokens

def categorize_keywords(keywords):
    categorized = {cat: [] for cat in SKILL_CATEGORIES}
    for word in keywords:
        for cat, words in SKILL_CATEGORIES.items():
            if word in words:
                categorized[cat].append(word)
    return categorized

def calculate_ats(resume_text, jd_text):
    # Tokenize
    resume_tokens = simple_tokenize(resume_text)
    jd_tokens = simple_tokenize(jd_text)

    # Count frequencies
    resume_counter = Counter(resume_tokens)
    jd_counter = Counter(jd_tokens)

    # Matched keywords
    matched_keywords = {word: resume_counter[word] for word in jd_counter if word in resume_counter}

    # Missing keywords from JD
    missing_keywords = [word for word in jd_counter if word not in resume_counter]

    # Extra keywords in resume not in JD
    extra_keywords = [word for word in resume_counter if word not in jd_counter]

    # Categorize
    matched_by_category = categorize_keywords(matched_keywords.keys())
    missing_by_category = categorize_keywords(missing_keywords)

    # --- Raw ATS score ---
    raw_score = (len(matched_keywords) / max(len(jd_counter), 1)) * 100

    # --- Boost the score visually ---
    # You can adjust multiplier (e.g., 2.5 or 3) to make low matches look better
    boosted_score = min(raw_score * 2, 99.0)  # Never exceeds 99.9%

    # Big JSON result
    result = {
        "ats_score": round(boosted_score, 2),
        "raw_score": round(raw_score, 2),  # Optional: keep original raw score
        "total_jd_keywords": len(jd_counter),
        "total_resume_keywords": len(resume_counter),
        "matched_keywords": matched_keywords,
        "missing_keywords": missing_keywords,
        "extra_keywords": extra_keywords,
        "matched_by_category": matched_by_category,
        "missing_by_category": missing_by_category
    }

    return result

# Example usage
if __name__ == "__main__":
    resume = """
    Python developer with experience in React, NodeJS, SQL, MachineLearning, TensorFlow, and data analysis.
    """
    jd = """
    Looking for a Python developer familiar with React, NodeJS, Backend development, SQL, MachineLearning, and Django.
    """

    import json
    result = calculate_ats(resume, jd)
    print(json.dumps(result, indent=4))

