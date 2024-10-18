// src/RealtimeUI.tsx
import React, { useState, useEffect } from "react";
import { start_realtime, resetAudio, InputState } from "./main";

const RealtimeUI: React.FC = () => {
  const [inputState, setInputState] = useState<InputState>(
    InputState.ReadyToStart
  );
  const [receivedText, setReceivedText] = useState<string[]>([]);

  useEffect(() => {
    const formReceivedTextContainer = document.querySelector<HTMLDivElement>(
      "#received-text-container"
    )!;
    formReceivedTextContainer.innerHTML = receivedText
      .map((text) => `<p>${text}</p>`)
      .join("");
  }, [receivedText]);

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
    <div>
      <div id="received-text-container"></div>
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
