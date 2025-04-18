# backend/services/groq_api.py

import os
import httpx
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def ask_groq(prompt: str):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    body = {
        "model": "mixtral-8x7b-32768",  # or use mixtral via openrouter
        "messages": [
            {"role": "system", "content": "You are a financial expert specialized in Indian stock markets."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }

    response = httpx.post(GROQ_API_URL, headers=headers, json=body)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]
