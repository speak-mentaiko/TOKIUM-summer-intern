import React from "react";
import { useState , useEffect} from "react";
// import { v4 as uuidv4 } from "uuid";
// uuidがなかったのでinstallしました
import { RouteList } from "../components/routelist/RouteList.tsx";
import { ListHeader } from "../components/ListHeader.tsx";

export const RouteListPage = () => {
  const API_BASE_URL = "http://localhost:3000/";
  const [routeListItems,  setRouteListItems] = useState([
      {
        "route_id": "e4a0ee4f-c366-43b6-a5d2-75d6a296eb40",
        "from": "つくば",
        "to": "おりはた"
      },
      {
        "route_id": "cd8a52da-6a37-47bc-ae7b-fb5b46aafb0c",
        "from": "つくば2",
        "to": "おりはた2"
      }
  ]);

    useEffect(() => {
      fetch(`${API_BASE_URL}api/v2/routes/list`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
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
