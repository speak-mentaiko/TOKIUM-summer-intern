import { FormEventHandler } from "react";

const signInSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const email = form.get("email") || "";
  const password = form.get("password") || "";
  //APIに変更
  console.log({ email: email, password: password });
};

export const Signin = () => {
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
    </>
  );
};
