import { useState, useEffect, FormEventHandler } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { ShowCostData } from "../components/Showcostdata";
import { userState } from "../hooks/userState";
import { costData } from "../types/costData";

export const Approval = () => {
  const API_BASE_URL = "http://localhost:3000";
  const navigate = useNavigate();
  const { costId } = useParams<{ costId: string }>();
  const [costData, setCostData] = useState<costData | undefined>(undefined);

  const userId = useRecoilValue(userState);
  console.log(userId.user_id);

  const approvalSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const status = form.get("status") || "";
    const message = form.get("message") || "";

    const date = new Date();
    const dateState = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    const approvalData = {
      cost_id: costId,
      approval_user_id: userId.user_id,
      approval_date: dateState,
      approval_status: status,
      approval_message: message,
    };

    fetch(`${API_BASE_URL}/api/v2/costs/approval`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(approvalData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "SUCCESS") {
          console.log(json);
          navigate("/list/approval");
        } else {
          console.log("error");
        }
      });
  };

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
      <div className={"flex flex-col items-center gap-4 w-full bg-pink-100"}>
        <ShowCostData {...costData} />
        <div className={"mt-30"}>
          <form
            onSubmit={approvalSubmit}
            className={"flex flex-col items-center gap-2"}
          >
            <label>
              承認：
              <select name="status">
                <option value="">選択してください</option>
                <option value="approval">承認</option>
                <option value="reject">差し戻し</option>
              </select>
            </label>
            <label>
              メッセージ：
              <input type="textarea" name="message" defaultValue="" />
            </label>
            <button className={"p-8 rounded-8 bg-gray-200"}>
              <input type="submit" value="Submit" />
            </button>
          </form>
        </div>
        <Link to="/list/approval" className={"px-8 py-4 rounded-8 bg-gray-200"}>
          戻る
        </Link>
      </div>
    </>
  );
};
