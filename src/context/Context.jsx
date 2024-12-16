import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const formatGeminiResponse = (response) => {
  let formattedText = response.replace(
    /(\*\*|__)(.*?)\1/g,
    '<b class="font-bold">$2</b>'
  );
  formattedText = formattedText.replace(/(\*|_)(.*?)\1/g, "<i>$2</i>");
  formattedText = formattedText.replace(/\n/g, "<br>");
  formattedText = formattedText.replace(/<br><br>/g, "</p><p>");
  if (!formattedText.startsWith("<p>")) {
    formattedText = "<p>" + formattedText + "</p>";
  }
  return formattedText;
};

const ContextProvider = (props) => {
  const [input, setinput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (formattedResponse) => {
    let currentText = "";
    let textContent = formattedResponse.replace(/<[^>]+>/g, " $& ");
    let words = textContent.split(" ").filter((word) => word.length > 0);
    let i = 0;

    setResultData("");

    const interval = setInterval(() => {
      if (i < words.length) {
        currentText += words[i] + (words[i].startsWith("<") ? "" : " ");
        setResultData(currentText);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    try {
      // Use the provided prompt or input state
      const promptToUse = prompt || input;
      const response = await run(promptToUse);

      // Only update prevPrompts if it's a new prompt
      if (!prevPrompts.includes(promptToUse)) {
        setPrevPrompts((prev) => [...prev, promptToUse]);
      }

      setRecentPrompt(promptToUse);

      const formattedResponse = formatGeminiResponse(response);
      delayPara(formattedResponse);
      setLoading(false);
      setinput("");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    newChat,
    setinput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
