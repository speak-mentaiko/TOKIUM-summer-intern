import { useState, FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { userState } from "../hooks/userState";

export const Signup = () => {
  const API_BASE_URL = "http://localhost:3000/";
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [userId, setUserId] = useRecoilState(userState);

  const signUpSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email") || "";
    const password = form.get("password") || "";
    const password_conf = form.get("password_conf") || "";
    const name = form.get("name") || "";
    const project = form.get("project") || "";
    const part = form.get("part") || "";

    const userData = {
      email: email,
      password: password,
      password_conf: password_conf,
      name: name,
      project: project,
      part: part,
    };

    fetch(`${API_BASE_URL}/api/v2/signup/${userData.part}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.user_id) {
          setUserId(json);
          navigate("/home");
        } else {
          console.log(json);
          setError(json.error);
        }
      });
  };

  return (
    <>
      <form onSubmit={signUpSubmit}>
        <label>
          メールアドレス:
          <input type="email" name="email" defaultValue="" />
        </label>
        <label>
          パスワード:
          <input type="password" name="password" defaultValue="" />
        </label>
        <label>
          パスワード(もう一度):
          <input type="password" name="password_conf" defaultValue="" />
        </label>
        <label>
          名前:
          <input type="text" name="name" defaultValue="" />
        </label>
        <label>
          プロジェクト:
          <input type="text" name="project" defaultValue="" />
        </label>
        <label>
          部署:
          <input type="text" name="part" defaultValue="" />
        </label>
        <button>
          <input type="submit" value="Submit" />
        </button>
      </form>
      <p>{error}</p>
    </>
  );
};
