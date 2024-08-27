import React from "react";

interface SummaryForAutoInputProps {
  onStartClick: () => void;
}

export const SummaryForAutoInput = ({
  onStartClick,
}: SummaryForAutoInputProps) => {
  const goStartPage = () => {
    onStartClick();
  };

  return (
    <>
      <div>#SummaryForAutoInput</div>
      <button onClick={goStartPage}>Home</button>
    </>
  );
};
