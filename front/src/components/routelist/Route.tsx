import React from "react";
import { useNavigate } from "react-router-dom";

export const Route = ({ route }) => {
  const navigate = useNavigate();
  const goToRouteRegistration = () => {
    navigate("./registration", { state: {id : route.route_id} });
  };

  return (
    <>
    <div className = 'bg-pink-50'>
      <div>from:{route.from}</div>
      <div>to:{route.to}</div>
      <button className = 'bg-gray-200' onClick={goToRouteRegistration}>登録</button>
    </div><br />
    </>
  );
};
