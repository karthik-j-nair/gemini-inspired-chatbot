import React, { useEffect, useState } from "react";
import { Equal, Send, CirclePlus } from "lucide-react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router";

const Dashboard = () => {
  const chat = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input, setInput] = useState("");

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = input.trim();
    if (!trimmedMessage) return;

    chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });

    setInput("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat({ chatId, chats });
  };

  return (
    <main className="h-screen w-full flex bg-white text-black dark:bg-slate-900 dark:text-slate-100 relative overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-64 z-50
          bg-white dark:bg-slate-800
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          shadow-lg md:shadow-none
          flex flex-col p-4 gap-4
        `}
      >
        <button className="bg-slate-100 flex items-center justify-center gap-2 dark:bg-slate-700 rounded-lg py-2 hover:opacity-80 transition cursor-pointer">
          <CirclePlus size={16} strokeWidth={1.75} /> New Chat
        </button>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {Object.values(chats).map((chat, index) => (
            <button
              key={index}
              onClick={() => {
                openChat(chat.id);
              }}
              className={`text-sm text-left px-3 py-2 rounded-lg cursor-pointer transition
    ${
      currentChatId === chat.id
        ? "bg-slate-700 text-white"
        : "bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700"
    }`}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Section */}
      <section className="flex flex-col items-center flex-1 h-full">
        {/* Header */}
        <header className="flex items-center w-full justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Equal size={24} />
            </button>
            <Link to="/">
              <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                Kairo AI
              </h1>
            </Link>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col md:w-4/5 p-4 gap-4 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {chats?.[currentChatId]?.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                    px-4 py-2 rounded-2xl shadow-sm
                    ${
                      msg.role === "user"
                        ? "bg-slate-900 max-w-[70%] rounded-br-none  rounded-tr-none text-white dark:bg-blue-400/40 dark:text-slate-100"
                        : "max-w-[90%]"
                    }
                  `}
                >
                  {msg.role === "ai" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0 leading-relaxed">
                            {children}
                          </p>
                        ),

                        ul: ({ children }) => (
                          <ul className="mb-2 list-disc pl-5 space-y-1">
                            {children}
                          </ul>
                        ),

                        ol: ({ children }) => (
                          <ol className="mb-2 list-decimal pl-5 space-y-1">
                            {children}
                          </ol>
                        ),

                        li: ({ children }) => (
                          <li className="leading-relaxed">{children}</li>
                        ),

                        code: ({ inline, children }) =>
                          inline ? (
                            <code className="rounded bg-white/10 px-1 py-0.5 text-sm">
                              {children}
                            </code>
                          ) : (
                            <code className="block text-sm">{children}</code>
                          ),

                        pre: ({ children }) => (
                          <pre className="mb-2 overflow-x-auto rounded-xl bg-black/40 p-3 text-sm">
                            {children}
                          </pre>
                        ),

                        h1: ({ children }) => (
                          <h1 className="text-lg font-semibold mb-2">
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2 className="text-base font-semibold mb-2">
                            {children}
                          </h2>
                        ),

                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),

                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-blue-500 underline"
                            target="_blank"
                          >
                            {children}
                          </a>
                        ),
                      }}
                      remarkPlugins={[remarkGfm]}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl shadow-sm"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent outline-none"
            />

            <button
              type="submit"
              className="p-2 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-80 transition cursor-pointer"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
