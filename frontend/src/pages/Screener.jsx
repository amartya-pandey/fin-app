import React, { useState } from "react";
import axios from "axios";

const Screener = () => {
  const [filters, setFilters] = useState({
    min_pe: "", max_pe: "",
    min_roe: "", max_roe: "",
    min_market_cap: "", max_market_cap: "",
    min_promoter_holding: "", max_promoter_holding: "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const params = {};
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });

      const res = await axios.get("http://localhost:8000/api/screener", { params });
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching screener results", err);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📊 Stock Screener (India)</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.keys(filters).map((key) => (
          <input
            key={key}
            name={key}
            value={filters[key]}
            onChange={handleChange}
            placeholder={key.replace(/_/g, " ").toUpperCase()}
            className="border p-2 rounded"
            type="number"
          />
        ))}
      </div>

      <button
        onClick={fetchResults}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🔍 Run Screener
      </button>

      {loading && <p className="mt-4">Loading...</p>}

      <div className="mt-6 space-y-4">
        {results.map((stock, idx) => (
          <div key={idx} className="p-4 border rounded shadow">
            <h3 className="font-semibold text-lg">{stock.name} ({stock.symbol})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
              <p>🧮 P/E: {stock.pe}</p>
              <p>📈 ROE: {stock.roe}</p>
              <p>🏢 Market Cap: ₹{Math.round(stock.market_cap / 1e7)} Cr</p>
              <p>👥 Promoter Holding: {stock.promoter_holding?.toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Screener;
