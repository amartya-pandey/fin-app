import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
        <div className="text-xl font-bold">📊 GroqSense</div>
        <ul className="flex space-x-6 text-gray-700">
          <li>Home</li>
          <li>Learn</li>
          <li>Assess</li>
          <li>Dashboard</li>
          <li>Community</li>
        </ul>
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
          👤
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-6 py-16 max-w-7xl mx-auto">
        <div className="max-w-xl space-y-4 prose prose-lg">
          <h1 className="font-bold text-gray-900">Learn. Practice. Grow.</h1>
          <p>
            Master Stock Market, Mutual Funds & F&O with guided learning and real-time assessments.
          </p>
          <div className="space-x-4">
            <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800">Start Learning</button>
            <button className="border px-5 py-2 rounded hover:bg-gray-100">Take a Skill Test</button>
          </div>
        </div>
        <div className="hidden md:block w-72 h-72 bg-gray-200 rounded-lg mt-10 md:mt-0">
          <div className="flex justify-center items-center h-full text-gray-500">📈 Illustration</div>
        </div>
      </section>

      {/* Card Section */}
      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "📉",
              title: "Stocks",
              desc: "Understand fundamentals, live charts & risk strategies.",
              primary: "Start Course",
              secondary: "Test Your Skills",
            },
            {
              icon: "📊",
              title: "Mutual Funds",
              desc: "From SIPs to ELSS — simplified learning & simulators.",
              primary: "Explore Modules",
              secondary: "Assess Yourself",
            },
            {
              icon: "🔗",
              title: "F&O",
              desc: "Learn options, strategies & risk management hands-on.",
              primary: "Interactive Lessons",
              secondary: "Challenge Mode",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow text-center prose">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button className="bg-black text-white px-4 py-1 rounded mb-2">{item.primary}</button>
              <br />
              <button className="border px-4 py-1 rounded">{item.secondary}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
