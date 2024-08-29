import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { userState } from "../hooks/userState";

export const Signin = () => {
  const API_BASE_URL = "http://localhost:3000/";
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [userId, setUserId] = useRecoilState(userState);

  const signInSubmit: FormEventHandler<HTMLFormElement> = (event: any) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email") || "";
    const password = form.get("password") || "";
    const userData = { email: email, password: password };
    //APIに変更
    fetch(`${API_BASE_URL}/api/v2/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.user_id) {
          setUserId(json.user_id);
          navigate("/home");
        } else {
          setError(json.error);
        }
      });
  };

  return (
    <>
      <form onSubmit={signInSubmit}>
        <label>
          メールアドレス:
          <input type="email" name="email" defaultValue="" />
        </label>
        <label>
          パスワード:
          <input type="password" name="password" defaultValue="" />
        </label>
        <button>
          <input type="submit" value="Submit" />
        </button>
      </form>
      <p>{error}</p>
    </>
  );
};
