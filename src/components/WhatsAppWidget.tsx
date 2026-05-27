"use client";

import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "user" | "bot"; text: string; time: string }[]>([
    {
      sender: "bot",
      text: "Hello! Thank you for contacting Sai Sneh Hospital's 24x7 desk. How can we help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = message;
    
    setChatLog((prev) => [...prev, { sender: "user", text: userMsg, time: userTime }]);
    setMessage("");
    setIsTyping(true);

    // Simulate desk operator response
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Sure, I can assist you with that. Please leave your mobile number and our reception desk will call you back in 5 minutes.";
      
      const textLower = userMsg.toLowerCase();
      if (textLower.includes("appointment") || textLower.includes("book") || textLower.includes("doctor")) {
        reply = "You can book an appointment instantly by clicking the 'Book Appointment' button at the top of the screen or visiting /book-appointment.";
      } else if (textLower.includes("dialysis") || textLower.includes("kidney")) {
        reply = "Our Dialysis Center runs 24x7. For dialysis slot availability or records, Dr. Mahendra Kadam's desk is available for consult.";
      } else if (textLower.includes("emergency") || textLower.includes("accident") || textLower.includes("icu")) {
        reply = "EMERGENCY: For ICU or ambulance dispatch, call 088881 50101 immediately. A doctor is available 24x7.";
      } else if (textLower.includes("cashless") || textLower.includes("insurance") || textLower.includes("mediclaim")) {
        reply = "We accept all major cashless insurances and government panels (PMC, MPJAY, PMJAY, MPKAY). You can check panels at /insurance.";
      }

      setChatLog((prev) => [
        ...prev,
        {
          sender: "bot",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            className="mb-4 w-80 sm:w-96 glass rounded-2xl shadow-premium overflow-hidden border border-emerald-green/10"
          >
            {/* Widget Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
                    SS
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 rounded-full border-2 border-emerald-600 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Sai Sneh Desk</h4>
                  <span className="text-xs text-emerald-100">Typically replies in 1 min</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-72 p-4 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50 flex flex-col gap-3">
              {chatLog.map((chat, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] flex flex-col gap-0.5 rounded-2xl px-3 py-2 text-sm ${
                    chat.sender === "user"
                      ? "bg-emerald-600 text-white self-end rounded-tr-none"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 self-start rounded-tl-none"
                  }`}
                >
                  <p>{chat.text}</p>
                  <span
                    className={`text-[9px] self-end ${
                      chat.sender === "user" ? "text-emerald-200" : "text-slate-400"
                    }`}
                  >
                    {chat.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-2 rounded-2xl rounded-tl-none text-slate-500 self-start text-xs flex gap-1 items-center">
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask about slots, pricing, panels..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-500 dark:text-white"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-500/20 cursor-pointer relative"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
          Online
        </span>
      </motion.button>
    </div>
  );
}
