# routes/screener.py

from fastapi import APIRouter, Query
from services.screener_logic import run_screener

router = APIRouter()

@router.get("/screener")
def screener(
    min_pe: float = Query(None),
    max_pe: float = Query(None),
    min_roe: float = Query(None),
    max_roe: float = Query(None),
    min_market_cap: float = Query(None),
    max_market_cap: float = Query(None),
    min_promoter_holding: float = Query(None),
    max_promoter_holding: float = Query(None),
):
    return run_screener(
        min_pe=min_pe, max_pe=max_pe,
        min_roe=min_roe, max_roe=max_roe,
        min_market_cap=min_market_cap, max_market_cap=max_market_cap,
        min_promoter_holding=min_promoter_holding,
        max_promoter_holding=max_promoter_holding
    )
