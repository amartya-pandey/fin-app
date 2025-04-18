import yfinance as yf
import pandas as pd
from typing import List, Dict

def get_52_week_high_low(symbols: List[str]) -> List[Dict[str, str]]:
    result = []

    for symbol in symbols:
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period="1y")
            if hist.empty:
                result.append({
                    "symbol": symbol,
                    "error": "No data found"
                })
                continue

            high = round(hist["High"].max(), 2)
            low = round(hist["Low"].min(), 2)

            result.append({
                "symbol": symbol,
                "52_week_high": f"₹{high}",
                "52_week_low": f"₹{low}"
            })
        except Exception as e:
            result.append({
                "symbol": symbol,
                "error": str(e)
            })

    return result
