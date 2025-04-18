from fastapi import APIRouter, Query
from services.fifty_two_week import get_52_week_high_low
from typing import List

router = APIRouter()

@router.get("/market/52week")
def get_52week_data(symbols: List[str] = Query(..., example=["RELIANCE.NS", "TCS.NS"])):
    return get_52_week_high_low(symbols)
