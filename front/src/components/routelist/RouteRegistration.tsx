import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ManualInputForm } from "../ManualInputForm.tsx";

export const RouteRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goBackToRouteList = () => {
    navigate("/list/route");
  };

  const { route } = location.state || {}; // 遷移元から渡されたデータを取得

  return (
    <>
      <button onClick={goBackToRouteList}>戻る</button>
      <ManualInputForm route={route} />
    </>
  );
};
