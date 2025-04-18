import React, { useEffect, useState } from "react";
import axios from "axios";
import FiftyTwoWeek from "./FiftyTwoWeek";

const Dashboard = () => {
  const [indices, setIndices] = useState({});
  const [movers, setMovers] = useState({ gainers: [], losers: [] });
  const [week52, setWeek52] = useState({ high: [], low: [] });

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(val);

  const formatPercent = (val) =>
    `${parseFloat(val).toFixed(2)}%`;

  useEffect(() => {
    axios.get("http://localhost:8000/market/indices").then((res) => setIndices(res.data));
    axios.get("http://localhost:8000/market/top-movers").then((res) => setMovers(res.data));
    axios.get("http://localhost:8000/market/52-week").then((res) => setWeek52(res.data));
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-3xl font-bold mb-4">📊 Market Dashboard</h2>

      {/* Indices */}
      <div>
        <h3 className="text-xl font-semibold mb-2">📈 Indices</h3>
        <p>Nifty 50: {formatCurrency(indices.nifty_50 || 0)}</p>
        <p>Sensex: {formatCurrency(indices.sensex || 0)}</p>
      </div>

      {/* Gainers */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-green-700">📈 Top Gainers</h3>
        <ul className="list-disc ml-6">
          {movers.gainers.map((stock, index) => (
            <li key={index}>
              {stock.symbol}: <span className="text-green-600">{formatPercent(stock.pChange)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Losers */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-red-700">📉 Top Losers</h3>
        <ul className="list-disc ml-6">
          {movers.losers.map((stock, index) => (
            <li key={index}>
              {stock.symbol}: <span className="text-red-600">{formatPercent(stock.pChange)}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 52-Week High */}
      <div>
        <h3 className="text-xl font-semibold mb-2">🟢 52-Week High</h3>
        <ul className="list-disc ml-6">
          {week52["52_week_high"].map((stock, index) => (
            <li key={index}>
              {stock.symbol}: {formatCurrency(stock["52_week_high"])}
            </li>
          ))}
        </ul>
      </div>

      {/* 52-Week Low */}
      <div>
        <h3 className="text-xl font-semibold mb-2">🔴 52-Week Low</h3>
        <ul className="list-disc ml-6">
          {week52["52_week_low"].map((stock, index) => (
            <li key={index}>
              {stock.symbol}: {formatCurrency(stock["52_week_low"])}
            </li>
          ))}
        </ul>
      </div>

      {/* Interactive Selection */}
      <div>
        <h3 className="text-xl font-semibold mb-2">🎯 Explore 52-Week Range for Selected Stocks</h3>
        <FiftyTwoWeek />
      </div>
    </div>
  );
};

export default Dashboard;
