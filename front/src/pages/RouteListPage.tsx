import React from "react";
import { useState , useEffect} from "react";
// import { v4 as uuidv4 } from "uuid";
// uuidがなかったのでinstallしました
import { RouteList } from "../components/routelist/RouteList.tsx";
import { ListHeader } from "../components/ListHeader.tsx";

export const RouteListPage = () => {
  const API_BASE_URL = "http://localhost:3000/";
  const [routeListItems,  setRouteListItems] = useState([]);

    useEffect(() => {
      fetch(`${API_BASE_URL}api/v2/routes/list`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setRouteListItems(data);
        })
        .catch((error) => console.log(error));
    }, []); 

  return (
    <>
      <div>#RouteListPage</div>
      <ListHeader />
      <RouteList routeListItems={routeListItems} />
    </>
  );
};
