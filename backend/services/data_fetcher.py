# backend/services/data_fetcher.py

import yfinance as yf
from bs4 import BeautifulSoup
import requests

def get_market_summary():
    tickers = ['^NSEI', '^BSESN', 'RELIANCE.NS', 'TCS.NS']
    data = {}
    for ticker in tickers:
        stock = yf.Ticker(ticker)
        info = stock.info
        data[ticker] = {
            "name": info.get("shortName"),
            "price": info.get("regularMarketPrice"),
            "change": info.get("regularMarketChange"),
            "percent": info.get("regularMarketChangePercent")
        }
    return data
