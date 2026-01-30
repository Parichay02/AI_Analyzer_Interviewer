from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv
from langchain_classic.chains import LLMChain
from services.prompts import interviewer_prompt
from services.memory import update_memory,memory

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
<<<<<<< HEAD
  

    openai_api_key=os.getenv("OPENAI_API_KEY"),
=======
    openai_api_key="xxx"
>>>>>>> 7dd0bd9c41c559d06755c87b0987a889c36165ae
    temperature=0.7
)

interview_chain = LLMChain(
    llm=llm,
    prompt=interviewer_prompt,    
)
