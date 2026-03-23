import React from "react";
import Navbar from "../../shared/components/Navbar";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Landing = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-all duration-300">
      <Navbar />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
        {/* Glow */}
        <div className="absolute w-125 h-125 bg-blue-500/20 blur-3xl rounded-full top-[-100px]"></div>

        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 dark:text-white leading-tight z-10">
          Smart Conversations <br />
          <span className="text-blue-600 dark:text-blue-400">
            With Real-Time Web Intelligence
          </span>
        </h1>

        <p className="mt-6 text-slate-500 dark:text-slate-400 max-w-xl z-10">
          Ask anything and get answers powered by AI + live internet search. No
          outdated knowledge just real-time, accurate responses.
        </p>

        {/* Badge */}
        <span className="mt-4 inline-block text-xs bg-blue-100 dark:bg-blue-900 text-blue-200 px-3 py-1 rounded-full z-10">
          ⚡ Powered by AI + Live Web Search
        </span>

        {/* CTA */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center z-10">
          {!user ? (
            <>
              <Link
                to="/register"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                Sign In
              </Link>
            </>
          ) : (
            <Link
              to="/home"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
            >
              Continue to Chat
            </Link>
          )}
        </div>
      </section>

      {/* TRUST / STATS */}
      <section className="px-6 py-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { label: "Users", value: "10K+" },
          { label: "Queries Answered", value: "1M+" },
          { label: "Accuracy", value: "Real-Time" },
          { label: "Models", value: "Gemini + Mistral" },
        ].map((item, i) => (
          <div key={i}>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {item.value}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          {
            title: "AI + Internet Search",
            desc: "Get answers enhanced with real-time web search for better accuracy.",
          },
          {
            title: "Reliable AI Responses",
            desc: "Get well-structured and thoughtful answers powered by advanced AI models.",
          },
          {
            title: "Context-Aware Chat",
            desc: "Maintains conversation flow while improving answers using live data.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white dark:bg-slate-800 border-l-3 border-l-blue-600 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* HIGHLIGHT SECTION */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="rounded-2xl bg-blue-600 text-white p-10 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Not just AI. It searches the web for you.
          </h2>

          <p className="max-w-2xl mx-auto text-blue-100">
            Traditional AI relies on old data. Our system actively searches the
            internet to give you fresh, relevant, and reliable answers just like
            a smart research assistant.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            How It Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Simple, fast, and powerful workflow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            "Ask your question",
            "AI searches the internet if needed",
            "Get accurate, real-time answer",
          ].map((step, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white dark:bg-slate-900 shadow-md text-center"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white mx-auto mb-4">
                {i + 1}
              </div>
              <p className="text-slate-700 dark:text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
          Ask Anything. Get Real-Time Answers.
        </h2>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Experience AI that doesn’t guess it searches.
        </p>

        <div className="mt-6">
          <Link
            to={user ? "/home" : "/register"}
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all"
          >
            {user ? "Go to Chat" : "Get Started Free"}
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-sm text-slate-500 dark:text-slate-400">
        Built with ❤️ using React, Tailwind & GenAI
      </footer>
    </div>
  );
};

export default Landing;
