import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { ShowCostData } from "../components/Showcostdata";
import { costData } from "../types/costData";

export const Approval = () => {
  const API_BASE_URL = "http://localhost:3000";
  const { costId } = useParams<{ costId: string }>();
  const [costData, setCostData] = useState<costData | undefined>(undefined);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v2/costs/list/${costId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
          setCostData(json.data);
          console.log(json.data);
        } else {
          console.log("error");
        }
      });
  }, []);

  return (
    <>
      <ShowCostData {...costData} />
      <Link to="/list/application">戻る</Link>
    </>
  );
};
