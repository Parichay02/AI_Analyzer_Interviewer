from langchain_openai import ChatOpenAI

from langchain_classic.chains import LLMChain
from services.prompts import interviewer_prompt
from services.memory import update_memory,memory

llm = ChatOpenAI(
    model="gpt-4o-mini",
    openai_api_key="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" ,
    temperature=0.7
)

interview_chain = LLMChain(
    llm=llm,
    prompt=interviewer_prompt,
    
)
