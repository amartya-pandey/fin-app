import React, { useState } from "react";
import axios from "axios";

const AIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    setAnswer("");
    try {
      const res = await axios.post("http://localhost:8000/api/ai", { prompt });
      setAnswer(res.data.response);
    } catch (err) {
      console.error("AI error", err);
      setAnswer("Something went wrong!");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🧠 Groq AI Assistant</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder="Ask something like: Compare Infosys and TCS on promoter holding"
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={askAI}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI 🤖"}
      </button>

      {answer && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          <strong>🗣 AI says:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AIChat;


const submitQuery = async () => {
  const res = await axios.post('http://localhost:8000/api/ai', { query })
  setResponse(res.data.response)
}
