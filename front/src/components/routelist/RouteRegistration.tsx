import React from "react";
import { useState , useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ManualInputForm } from "../ManualInputForm.tsx";

export const RouteRegistration = () => {
  const API_BASE_URL = "http://localhost:3000/";
  const location = useLocation();
  const navigate = useNavigate();

  const [route, setRoute] = useState();

  const goBackToRouteList = () => {
    navigate("/list/route");
  };

  const route_id = location.state || {}; 

  useEffect(() => {
    fetch(`${API_BASE_URL}api/v2/routes/list/${route_id.id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRoute(data);
      })
      .catch((error) => console.log(error));
  }, []); 


  return (
    <>
      <button onClick={goBackToRouteList}>戻る</button>
      <ManualInputForm route={route} />
    </>
  );
};
