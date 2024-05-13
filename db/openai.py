from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_content(initial_text: str, max_length: int) -> str:
    completion = client.chat.completions.create(
        model="ft:gpt-3.5-turbo-1106:pascual-bravo::8je9hm1e",
        messages=[
            {"role": "system", "content": "Eres un asistente que permite a los usuarios interactuar con la base de la generación de texto para temas académicos de manera personalizada."},
            {"role": "user", "content": initial_text}
        ]
    )
    return completion.choices[0].message.content