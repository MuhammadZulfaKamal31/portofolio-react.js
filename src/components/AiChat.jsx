import React, { useContext } from "react";
import { assets } from "../assets/ai/assets";
import {
  ClipboardCheck,
  Code,
  Compass,
  Image,
  Lightbulb,
  Mic,
  Send,
  User,
} from "lucide-react";
import { brainwave, brainwaveSymbol } from "../assets";
import { Context } from "../context/Context";
import { AnimatePresence, motion } from "framer-motion";

const AiChat = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setinput,
    input,
  } = useContext(Context);

  return (
    <div className="flex-1 h-[100vh] pb-[15vh] relative">
      <div className="flex items-center justify-between p-5 text-[22px]">
        <a className="block w-[12rem] xl:mr-8">
          <img
            className="w-[70%] mt-2 sm:mt-0 sm:w-[90%] md:mt-0 md:w-full"
            src={brainwave}
            width={190}
            height={40}
            alt="Brainwave"
          />
        </a>
        <User className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] bg-n-5 rounded-full" />
      </div>
      <div className="max-w-[900px] m-auto">
        {!showResult ? (
          <>
            <div className="mt-[30px] mb-[20px] sm:mt-12 sm:mb-12 mx-0 text-[40px] sm:text-[56px] md:text-[64px] p-5 font-medium">
              <p>
                <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  Hello
                </span>
              </p>
              <p className="mt-5 text-[20px] mx-[2px] font-light sm:text-[50px] sm:mt-8 sm:font-medium">
                How can i help you today ?
              </p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5">
              <div className="rounded-xl h-[120px] sm:h-[200px] p-[15px] bg-n-5 relative cursor-pointer">
                <p className="text-[12px] leading-5 font-light sm:text-[15px] sm:font-medium sm:leading-7">
                  Suggest beautiful places to see on an upcoming roadtrip
                </p>
                <Compass className="w-4 h-4 p-[3px] sm:w-7 sm:h-7 rounded-full bg-n-8 absolute bottom-[10px] right-[10px]" />
              </div>
              <div className="rounded-xl h-[120px] sm:h-[200px] p-[15px] bg-n-5 relative cursor-pointer">
                <p className="text-[12px] leading-5 font-light sm:text-[15px] sm:font-medium sm:leading-7">
                  Briefly summarize this concept: urban planning
                </p>
                <Lightbulb className="w-4 h-4 sm:w-7 sm:h-7 p-[3px] sm:p-[4px] rounded-full bg-n-8 absolute bottom-[10px] right-[10px]" />
              </div>
              <div className="rounded-xl h-[120px] sm:h-[200px] p-[15px] bg-n-5 relative cursor-pointer">
                <p className="text-[12px] leading-5 font-light sm:text-[15px] sm:font-medium sm:leading-7">
                  Brainstrom team bonding activities for our work retreat
                </p>
                <ClipboardCheck className="w-4 h-4 p-[3px] py-[3.5px] sm:w-7 sm:h-7 sm:p-[5px] sm:py-[3px] rounded-full bg-n-8 absolute bottom-[10px] right-[10px]" />
              </div>
              <div className="rounded-xl h-[120px] sm:h-[200px] p-[15px] bg-n-5 relative cursor-pointer">
                <p className="text-[12px] leading-5 font-light sm:text-[15px] sm:font-medium sm:leading-7">
                  Improve the readability of the following code
                </p>
                <Code className="w-4 h-4 p-[3px] sm:w-7 sm:h-7 sm:p-[5px] rounded-full bg-n-8 absolute bottom-[10px] right-[10px]" />
              </div>
            </div>
          </>
        ) : (
          <div
            className="py-0 px-[3%] max-h-[70vh] overflow-y-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex items-start gap-5 my-10 mx-0">
              <User className="w-[30px] h-[30px] bg-n-5 rounded-full" />
              <p>{recentPrompt}</p>
            </div>
            <div className="flex items-start gap-5">
              <img src={brainwaveSymbol} alt="" />
              {loading ? (
                <div className="w-full flex flex-col gap-3">
                  {[1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className="h-[20px] w-full rounded-md relative overflow-hidden"
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-md"
                        style={{
                          background: `linear-gradient(90deg, 
                            rgba(255, 255, 255, 0) 0%, 
                            rgba(255, 255, 255, 0.1) 50%, 
                            rgba(255, 255, 255, 0) 100%)`,
                          animation: `shine ${
                            1.5 + index * 0.2
                          }s infinite linear`,
                          backgroundSize: "200% 100%",
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className="text-[15px] font-light leading-[1.8]"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-[900px] py-0 px-5 m-auto">
          <motion.div
            whileHover={{
              scale: 1.01,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center justify-between gap-5 py-[10px] px-[20px] rounded-[50px] bg-n-6"
          >
            <motion.input
              onChange={(e) => setinput(e.target.value)}
              value={input}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex-1 bg-transparent outline-none border-none p-1 text-[12px] sm:text-[16px] md:text-[18px]"
              type="text"
              placeholder="Enter a prompt here"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  onSent();
                }
              }}
            />
            <div className="flex gap-2 items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Image className="w-5 cursor-pointer text-n-2" />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Mic className="w-5 cursor-pointer text-n-2" />
              </motion.div>

              <AnimatePresence mode="popLayout">
                {input.trim() && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0, opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      duration: 0.3,
                    }}
                  >
                    <Send
                      onClick={() => onSent()}
                      className="w-5 cursor-pointer text-n-2"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          <p className="mt-3 mb-2 text-center font-medium text-[10px] sm:text-[12px]">
            Brainwave can make mistakes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
