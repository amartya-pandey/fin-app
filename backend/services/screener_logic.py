# backend/services/screener_logic.py

import yfinance as yf
import pandas as pd

# Minimal example NSE stock list — you can expand this
STOCKS = [
    "RELIANCE.NS", "TCS.NS", "INFY.NS", "HDFCBANK.NS",
    "ICICIBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS"
]

def fetch_stock_data(ticker):
    stock = yf.Ticker(ticker)
    info = stock.info
    return {
        "symbol": ticker,
        "name": info.get("shortName"),
        "pe": info.get("trailingPE"),
        "roe": info.get("returnOnEquity"),
        "market_cap": info.get("marketCap"),
        "promoter_holding": info.get("heldPercentInsiders"),  # Proxy
    }

def run_screener(
    min_pe=None, max_pe=None,
    min_roe=None, max_roe=None,
    min_market_cap=None, max_market_cap=None,
    min_promoter_holding=None, max_promoter_holding=None
):
    records = []

    for ticker in STOCKS:
        try:
            data = fetch_stock_data(ticker)
            records.append(data)
        except Exception:
            continue  # skip broken tickers

    df = pd.DataFrame(records)

    # Convert to numeric with safe handling
    df["pe"] = pd.to_numeric(df["pe"], errors="coerce")
    df["roe"] = pd.to_numeric(df["roe"], errors="coerce")
    df["market_cap"] = pd.to_numeric(df["market_cap"], errors="coerce")
    df["promoter_holding"] = pd.to_numeric(df["promoter_holding"], errors="coerce") * 100

    # Apply filters
    if min_pe is not None:
        df = df[df["pe"] >= min_pe]
    if max_pe is not None:
        df = df[df["pe"] <= max_pe]
    if min_roe is not None:
        df = df[df["roe"] >= min_roe]
    if max_roe is not None:
        df = df[df["roe"] <= max_roe]
    if min_market_cap is not None:
        df = df[df["market_cap"] >= min_market_cap]
    if max_market_cap is not None:
        df = df[df["market_cap"] <= max_market_cap]
    if min_promoter_holding is not None:
        df = df[df["promoter_holding"] >= min_promoter_holding]
    if max_promoter_holding is not None:
        df = df[df["promoter_holding"] <= max_promoter_holding]

    return df.fillna("N/A").to_dict(orient="records")
