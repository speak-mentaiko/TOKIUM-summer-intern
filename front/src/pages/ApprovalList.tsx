import { useState, useEffect } from "react";

type cost = {
  cost_id: string;
  user_id: string;
  date: string;
  visit: string;
};

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
        if (json.status === "SUCCESS") {
          setRequestList(json.data);
          console.log(json.data);
        } else {
          console.log("error");
        }
      });
  }, []);

  if (!requestList.length) {
    return (
      <>
        <p>データがありません</p>
      </>
    );
  } else {
    requestList.map((cost: cost) => {
      return <ApplicationCard application={cost} />;
    });
  }
};
