# backend/routes/stocks.py

from fastapi import APIRouter
from services.data_fetcher import get_market_summary

router = APIRouter()

@router.get("/summary")
async def market_summary():
    return get_market_summary()
