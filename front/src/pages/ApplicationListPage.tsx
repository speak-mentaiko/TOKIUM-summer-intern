import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// uuidがなかったのでinstallしました
import { ApplicationList } from "../components/applicationlist/ApplicationList.tsx";
import { ListHeader } from "../components/ListHeader.tsx";

export const ApplicationListPage = () => {
  const [applicationListItems, setApplicationListItems] = useState([
    { id: uuidv4(), name: "Application1" },
    { id: uuidv4(), name: "Application2" },
  ]);

  return (
    <>
      <div>#ApplicationListPage</div>
      <ListHeader />
      <ApplicationList applicationListItems={applicationListItems} />
    </>
  );
};
