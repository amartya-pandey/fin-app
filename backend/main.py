
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import stocks, screener, ai
from routes import market
from routes import fifty_two_week



app = FastAPI(title="GroqSense")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(stocks.router, prefix="/api/stocks")
app.include_router(screener.router, prefix="/api/screener")
app.include_router(ai.router, prefix="/api/ai")
app.include_router(market.router, prefix="/api")
app.include_router(fifty_two_week.router, prefix="/api")