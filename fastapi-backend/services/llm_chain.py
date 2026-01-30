from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv
from langchain_classic.chains import LLMChain
from services.prompts import interviewer_prompt
from services.memory import update_memory,memory

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
  

    openai_api_key=os.getenv("OPENAI_API_KEY"),
    temperature=0.7
)

interview_chain = LLMChain(
    llm=llm,
    prompt=interviewer_prompt,    
)
