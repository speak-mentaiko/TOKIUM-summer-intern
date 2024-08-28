import React from "react";
import { Route } from "./Route.tsx";

export const RouteList = ({ routeListItems }) => {
  return routeListItems.map((route) => <Route route={route} key={route.id} />);
};
