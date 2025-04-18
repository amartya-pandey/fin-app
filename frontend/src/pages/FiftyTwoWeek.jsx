// frontend/src/pages/FiftyTwoWeek.jsx

import { useState } from 'react'
import axios from 'axios'

const symbols = [
  { label: "Reliance", value: "RELIANCE.NS" },
  { label: "TCS", value: "TCS.NS" },
  { label: "Infosys", value: "INFY.NS" },
  { label: "HDFC Bank", value: "HDFCBANK.NS" },
  { label: "ICICI Bank", value: "ICICIBANK.NS" },
  { label: "Wipro", value: "WIPRO.NS" },
  { label: "Bajaj Finance", value: "BAJFINANCE.NS" },
  { label: "ITC", value: "ITC.NS" },
  { label: "Kotak Bank", value: "KOTAKBANK.NS" }
]

export default function FiftyTwoWeek() {
  const [selected, setSelected] = useState([])
  const [results, setResults] = useState([])

  const fetch52Week = async () => {
    try {
      const query = selected.map(s => `symbols=${s}`).join('&')
      const res = await axios.get(`http://localhost:8000/api/market/52week?${query}`)
      setResults(res.data)
    } catch (err) {
      console.error(err)
      alert("Error fetching data")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">📈 52-Week High / Low Tracker</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {symbols.map((s) => (
          <label key={s.value} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={s.value}
              onChange={(e) => {
                const val = e.target.value
                setSelected((prev) =>
                  prev.includes(val)
                    ? prev.filter((v) => v !== val)
                    : [...prev, val]
                )
              }}
            />
            <span>{s.label}</span>
          </label>
        ))}
      </div>

      <button
        onClick={fetch52Week}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
      >
        Get 52-Week Data
      </button>

      <div className="grid gap-4 mt-6">
        {results.map((r) => (
          <div
            key={r.symbol}
            className="p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <div className="font-semibold">{r.symbol}</div>
            {r.error ? (
              <div className="text-red-600">❌ {r.error}</div>
            ) : (
              <div>
                <span className="text-green-600">📈 High: {r["52_week_high"]}</span><br />
                <span className="text-red-600">📉 Low: {r["52_week_low"]}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
