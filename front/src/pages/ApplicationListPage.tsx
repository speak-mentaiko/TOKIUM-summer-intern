import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { userState } from "../hooks/userState.ts";
import { ApplicationCard } from "../components/ApplicationCard.tsx";

type cost = {
  cost_id: string;
  user_id: string;
  date: string;
  visit: string;
};

export const ApplicationListPage = () => {
  const API_BASE_URL = "http://localhost:3000";
  const userId = useRecoilValue(userState);

  const [costList, setCostList] = useState<cost[]>([]);
  //APIでデータを取得
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v2/costs/request/list/${userId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
          setCostList(json.data);
          console.log(json.data);
        } else {
          console.log("error");
        }
      });
  }, []);

  return (
    <>
      <div>#ApplicationListPage</div>
      {costList.map((cost: cost) => {
        return <ApplicationCard application={cost} />;
      })}
    </>
  );
};
