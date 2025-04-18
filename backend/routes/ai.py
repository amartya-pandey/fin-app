from fastapi import APIRouter, Request
from services.fifty_two_week import get_52_week_high_low
from utils.nifty50_list import NIFTY_50_SYMBOLS
import re
import os
import requests

router = APIRouter()

GROQ_API_URL = "https://api.groq.com/openrouter/completion"  # example
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def extract_symbols(text):
    found = []
    for sym in NIFTY_50_SYMBOLS:
        if sym.split(".")[0].lower() in text.lower():
            found.append(sym)
    return found

@router.post("/ai")
async def handle_ai_query(req: Request):
    body = await req.json()
    user_query = body.get("query", "")

    matched_symbols = extract_symbols(user_query)

    if "52-week" in user_query.lower() and matched_symbols:
        data = get_52_week_high_low(matched_symbols)
        response_text = "\n".join(
            f"{item['symbol']}: High={item.get('52_week_high', '-')}, Low={item.get('52_week_low', '-')}"
            for item in data
        )
        return { "source": "52week", "response": response_text }

    # fallback to Groq AI if no match
    payload = {
        "model": "mixtral-8x7b",
        "messages": [
            {"role": "system", "content": "You are a financial assistant for the Indian stock market."},
            {"role": "user", "content": user_query}
        ]
    }
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(GROQ_API_URL, headers=headers, json=payload)
    result = response.json()
    return { "source": "groq", "response": result.get("choices", [{}])[0].get("message", {}).get("content", "") }
