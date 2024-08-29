import React from "react";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ApplicationList } from "../components/applicationlist/ApplicationList.tsx";
import { ListHeader } from "../components/ListHeader.tsx";
import { userState } from "../hooks/userState.ts";

export const ApplicationListPage = () => {
  const API_BASE_URL = "http://localhost:3000/";
  const userId = useRecoilValue(userState);
  const [applicationListItems, setApplicationListItems] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}api/v2/costs/request/list/${userId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data)
        setApplicationListItems(data.data);
      })
      .catch((error) => console.log(error));
  }, []); 

  return (
    <>
      <div>#ApplicationListPage</div>
      <ListHeader />
      <ApplicationList applicationListItems={applicationListItems} />
    </>
  );
};
