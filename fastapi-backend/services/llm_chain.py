from langchain_openai import ChatOpenAI

from langchain_classic.chains import LLMChain
from services.prompts import interviewer_prompt
from services.memory import update_memory,memory

llm = ChatOpenAI(
    model="gpt-4o-mini",
    openai_api_key="xxx"
    temperature=0.7
)

interview_chain = LLMChain(
    llm=llm,
    prompt=interviewer_prompt,
    
)
