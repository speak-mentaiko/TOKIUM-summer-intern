import React from "react";
import { useNavigate } from "react-router-dom";

export const Route = ({ route }) => {
  const navigate = useNavigate();
  const goToRouteRegistration = () => {
    console.log(route.route_id);
    navigate("./registration", { state: {id : route.route_id} });
  };

  return (
    <>
      <div>{route.from}</div>
      <div>{route.to}</div>
      <button onClick={goToRouteRegistration}>登録</button>
    </>
  );
};
