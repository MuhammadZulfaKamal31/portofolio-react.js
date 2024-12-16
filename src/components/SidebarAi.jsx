import React from "react";
import { useState, useContext } from "react";
import {
  Menu,
  Plus,
  MessageSquare,
  HelpCircle,
  History,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { Context } from "../context/Context";

const SidebarAi = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={`relative min-h-screen py-6 px-2 flex flex-col justify-between bg-n-6 transition-all duration-300 ease-in-out
        before:absolute before:right-0 before:top-0 before:w-[2px] before:h-full
        before:bg-gradient-to-b before:from-yellow-300 before:via-purple-600 before:to-blue-500
        ${showMenu ? "w-28 sm:w-40" : "w-16"}`}
    >
      <div className="flex flex-col">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-8 h-8 ml-1 flex items-center justify-center rounded-full transition-colors duration-200"
        >
          <Menu className="w-5 h-5 text-n-1" />
        </button>

        <div onClick={() => newChat()} className="mt-6 w-full">
          <motion.div
            className="flex items-center gap-2 py-1 sm:py-2 px-2 bg-n-7 rounded-full cursor-pointer hover:bg-n-8 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-4 h-4 text-n-3" />
            <span
              className={`text-[10px] sm:text-xs text-n-2 whitespace-nowrap transition-opacity duration-200 ${
                showMenu ? "block opacity-100" : "opacity-0 w-0"
              }`}
            >
              New Chat
            </span>
          </motion.div>
        </div>

        {showMenu && prevPrompts.length > 0 && (
          <motion.div
            className="w-full mt-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-xs text-n-1 mb-3 px-3">Recent</p>
            {/* Remove duplicates and reverse to show most recent first */}
            {[...new Set(prevPrompts)].reverse().map((item, index) => (
              <motion.div
                onClick={() => loadPrompt(item)}
                key={index}
                className="flex my-2 items-center py-2 px-3 rounded-full bg-n-7 cursor-pointer hover:bg-n-8 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="min-w-4 h-4 text-n-2" />
                <div className="flex-1 ml-2">
                  <p className="text-xs text-n-2 line-clamp-1">{item}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {[
          { name: "Help", icon: HelpCircle },
          { name: "Activity", icon: History },
          { name: "Setting", icon: Settings },
        ].map((item) => (
          <motion.div
            key={item.name}
            className="flex items-center gap-2 py-1 sm:py-2 px-3 rounded-full bg-n-7 cursor-pointer hover:bg-n-8 transition-colors duration-200"
            whileHover={{ x: 2 }}
          >
            <item.icon className="w-5 h-4 text-n-3" />
            <span
              className={`text-[10px] sm:text-xs text-n-2 whitespace-nowrap transition-opacity duration-200 ${
                showMenu ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              {item.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SidebarAi;
