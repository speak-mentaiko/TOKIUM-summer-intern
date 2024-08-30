import { useState, useEffect } from "react";

import { ApprovalCard } from "../components/ApprovalCard";
import { cost } from "../types/cost";

export const ApprovalList = () => {
  const API_BASE_URL = "http://localhost:3000";

  const [requestList, setRequestList] = useState<cost[]>([]);
  //APIでデータを取得
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v2/costs/request/list`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setRequestList(json);
      });
  }, []);

  if (!requestList.length) {
    return (
      <>
        <p>データがありません</p>
      </>
    );
  } else {
    return (
      <>
        <div className={"flex justify-center m-10"}>
          {requestList.map((cost: cost) => {
            return <ApprovalCard {...cost} />;
          })}
        </div>
      </>
    );
  }
};
