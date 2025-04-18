from fastapi import APIRouter
from services.market_data import get_nifty_sensex, get_top_gainers, get_top_losers

router = APIRouter()

@router.get("/market/indices")
def market_indices():
    return get_nifty_sensex()

@router.get("/market/gainers")
def market_gainers():
    return get_top_gainers()

@router.get("/market/losers")
def market_losers():
    return get_top_losers()
