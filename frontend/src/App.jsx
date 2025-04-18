import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Screener from "./pages/Screener";
import AIChat from "./pages/AIChat";
import FiftyTwoWeek from './pages/FiftyTwoWeek'

<Route path="/52week" element={<FiftyTwoWeek />} />
export default function App() {
  return (
    <BrowserRouter>
      <nav className="bg-black text-white px-6 py-3 flex justify-between items-center">
        <h1 className="font-bold text-xl">GroqSense 💹</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Screener</Link>
          <Link to="/ai" className="hover:underline">AI Assistant</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Screener />} />
        <Route path="/ai" element={<AIChat />} />
      </Routes>
    </BrowserRouter>
  );
}
