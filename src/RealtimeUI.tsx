import React, { useState, useEffect } from "react";
import { start_realtime, resetAudio, InputState, eventEmitter } from "./main";

const RealtimeUI: React.FC = () => {
  const [inputState, setInputState] = useState<InputState>(
    InputState.ReadyToStart
  );
  const [receivedText, setReceivedText] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<string>("");

  useEffect(() => {
    const handleTextUpdate = (newText: string) => {
      setCurrentLine((prevLine) => {
        const updatedLine = prevLine + newText;
        if (newText.includes("\n")) {
          setReceivedText((prevText) => [...prevText, updatedLine.trim()]);
          return "";
        }
        return updatedLine;
      });
    };

    eventEmitter.on("textUpdate", handleTextUpdate);

    return () => {
      eventEmitter.off("textUpdate", handleTextUpdate);
    };
  }, []);

  const handleStartClick = async () => {
    setInputState(InputState.Working);
    try {
      await start_realtime();
      setInputState(InputState.ReadyToStop);
    } catch (error) {
      console.log(error);
      setInputState(InputState.ReadyToStart);
    }
  };

  const handleStopClick = async () => {
    setInputState(InputState.Working);
    await resetAudio(false);
    setInputState(InputState.ReadyToStart);
  };

  return (
    <div className="container">
      <div id="received-text-container">
        {receivedText.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        {currentLine && <p>{currentLine}</p>}
      </div>
      <div className="controls">
        <div className="button-group">
          <button
            id="start-recording"
            type="button"
            onClick={handleStartClick}
            disabled={inputState !== InputState.ReadyToStart}
          >
            Record
          </button>
          <button
            id="stop-recording"
            type="button"
            onClick={handleStopClick}
            disabled={inputState !== InputState.ReadyToStop}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default RealtimeUI;
