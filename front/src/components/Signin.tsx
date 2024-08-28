import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const API_BASE_URL = "http://localhost:3000/";
  const navigate = useNavigate();

  const [issignIn, setSignIn] = useState<boolean | undefined>(undefined);

  const signInSubmit: FormEventHandler<HTMLFormElement> = (event) => {
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
          navigate("/home");
        } else {
          setSignIn(false);
          console.log(issignIn);
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
      {!issignIn ? <p>サインインに失敗しました</p> : <div>{issignIn}</div>}
    </>
  );
};
