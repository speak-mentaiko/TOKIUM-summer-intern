import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// uuidがなかったのでinstallしました
import { RouteList } from "../components/routelist/RouteList.tsx";
import { ListHeader } from "../components/ListHeader.tsx";

export const RouteListPage = () => {
  const [routeListItems, setRouteListItems] = useState([
    {
      id: uuidv4(),
      from: "浅草",
      via: [],
      to: "つくば",
      amount: 1000,
      distance: 1000,
    },
    {
      id: uuidv4(),
      from: "大阪",
      via: [],
      to: "京都",
      amount: 1000,
      distance: 1000,
    },
  ]);

  return (
    <>
      <div>#RouteListPage</div>
      <ListHeader />
      <RouteList routeListItems={routeListItems} />
    </>
  );
};
