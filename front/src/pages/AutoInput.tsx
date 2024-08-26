import React from 'react';
import { useState } from "react";
import { StartStopButton } from "../components/StartStopButton.tsx";
import { SummaryForAutoInput } from "../components/SummaryForAutoInput.tsx";

export const AutoInput = () => {

  const [showStartStopButtonStatus, setShowStartStopButtonStatus] = useState(true);


  const handleStopClick = () => {
    setShowStartStopButtonStatus(false);
  };

  const handleStartClick = () => {
    setShowStartStopButtonStatus(true);
  };

  return (
      <>
        <div>#AutoInput</div>
        {showStartStopButtonStatus ? (
          <StartStopButton onStopClick={handleStopClick} />
        ) : (
          <SummaryForAutoInput onStartClick = {handleStartClick} />
        )}
      </>
  )
}