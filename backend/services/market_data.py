import requests
from typing import List, Dict
from requests.exceptions import RequestException

BASE_HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json",
    "Referer": "https://www.nseindia.com/",
}

SESSION = requests.Session()
SESSION.headers.update(BASE_HEADERS)

def get_nifty_sensex() -> Dict[str, float]:
    try:
        url = "https://www.nseindia.com/api/allIndices"
        response = SESSION.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        result = {}

        for index in data["data"]:
            if index["index"] in ["NIFTY 50", "S&P BSE SENSEX"]:
                result[index["index"]] = float(index["last"])

        return result
    except RequestException as e:
        return {"error": str(e)}

def get_top_gainers() -> List[Dict[str, str]]:
    try:
        url = "https://www.nseindia.com/api/live-analysis-variations?index=gainers"
        response = SESSION.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data["DATA"]
    except RequestException as e:
        return [{"error": str(e)}]

def get_top_losers() -> List[Dict[str, str]]:
    try:
        url = "https://www.nseindia.com/api/live-analysis-variations?index=losers"
        response = SESSION.get(url, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data["DATA"]
    except RequestException as e:
        return [{"error": str(e)}]
