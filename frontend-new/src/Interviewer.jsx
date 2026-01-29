import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Interviewer() {
  const [role, setRole] = useState("SDE");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [metrics, setMetrics] = useState(null);
 const navigate = useNavigate();

  const sendAnswer = async () => {
    if (!answer.trim()) return;

    const userMsg = { type: "user", text: answer };
    setMessages((prev) => [...prev, userMsg]);
    setAnswer("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/interview", {
        answer,
        role
      });

      setMessages((prev) => [
        ...prev,
        { type: "ai", text: res.data.question }
      ]);

      setMetrics({
        correctness: res.data.correctness,
        confidence: res.data.confidence,
        hesitation: res.data.hesitation
      });
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "⚠️ Error contacting interviewer AI" }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
        <button className=" absolute top-4 right-4 text-bold text-white mr-8 bg-red-600 px-4 py-2 text-2xl hover:bg-red-800 rounded" onClick={() => navigate("/home")}>← Back</button>
     
      <div className="w-full max-w-4xl bg-black/40 backdrop-blur-xl rounded-2xl shadow-2xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-wide">
            AI Interviewer
          </h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-black/60 border border-blue-500 rounded-lg px-3 py-1 focus:outline-none"
          >
            <option>SDE</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>ML Engineer</option>
          </select>
        </div>

        {/* Chat Box */}
        <div className="h-[420px] overflow-y-auto space-y-4 p-4 rounded-xl bg-black/50 border border-blue-900">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">
              Start answering to begin your interview
            </p>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-3 rounded-xl text-sm ${
                msg.type === "user"
                  ? "ml-auto bg-blue-600"
                  : "mr-auto bg-red-600"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="mr-auto bg-red-600 px-4 py-3 rounded-xl animate-pulse">
              Thinking...
            </div>
          )}
        </div>

        {/* Metrics */}
        {metrics && (
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <Metric label="Correctness" value={metrics.correctness} color="green" />
            <Metric label="Confidence" value={metrics.confidence} color="blue" />
            <Metric label="Hesitation" value={metrics.hesitation} color="red" />
          </div>
        )}

        {/* Input */}
        <div className="flex gap-3 mt-5">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendAnswer()}
            placeholder="Type your answer..."
            className="flex-1 bg-black/60 border border-blue-500 rounded-xl px-4 py-3 focus:outline-none"
          />
          <button
            onClick={sendAnswer}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-red-600 px-6 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, color }) {
  return (
    <div className="bg-black/60 rounded-xl p-3 border border-gray-700">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-xl font-bold text-${color}-400`}>
        {Math.round(value * 100)}%
      </p>
    </div>
  );
}
