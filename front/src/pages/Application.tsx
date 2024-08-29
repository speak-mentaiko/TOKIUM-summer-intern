import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

type costData = {
  id: number;
  cost_id: string;
  user_id: string; //申請者
  date: string; //利用日
  vist: string; //訪問先
  ca: string; //経費科目
  route_from: string; //出発地
  route_via0: string | null; //経由地
  route_via1: string | null;
  route_via2: string | null;
  route_via3: string | null;
  route_via4: string | null;
  route_to: string; //到着地
  route_way: string; //移動方法
  route_amount: number; //金額
  memo: string;
  approval_user_id: string | null; //承認者
  approval_status: string | null;
  approval_date: string | null; //承認日
  approval_message: string | null;
};

export const Application = () => {
  const API_BASE_URL = "http://localhost:3000";
  const { costId } = useParams<{ costId: string }>();
  const [costData, setCostData] = useState<costData | undefined>(undefined);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v2/costs/list/${costId.user_id}`, {
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
      <div>
        <p>date:{costData?.date}</p>
        <p>visit:{costData?.visit}</p>
        <p>ca:{costData?.ca}</p>
        <ul>
          <li>from:{costData?.route_from}</li>
          <li>via0:{costData?.route_via0}</li>
          <li>via1:{costData?.route_via1}</li>
          <li>via2:{costData?.route_via2}</li>
          <li>via3:{costData?.route_via3}</li>
          <li>via4:{costData?.route_via4}</li>
          <li>to:{costData?.route_to}</li>
        </ul>
        <p>amount:{costData?.route_amount}</p>
        <p>memo:{costData?.memo}</p>
      </div>
      <Link to="/list/application">戻る</Link>
    </>
  );
};
