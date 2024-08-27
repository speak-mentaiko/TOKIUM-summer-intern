import { useState } from "react";
import { StartStopButton } from "./StartStopButton";
import { SummaryForAutoInput } from "./SummaryForAutoInput";

export const AutoInput = () => {
  const [showStartStopButtonStatus, setShowStartStopButtonStatus] =
    useState(true);

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
        <SummaryForAutoInput onStartClick={handleStartClick} />
      )}
    </>
  );
};
