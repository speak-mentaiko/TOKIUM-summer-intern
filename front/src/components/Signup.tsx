import { FormEventHandler } from "react";

const signUpSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const email = form.get("email") || "";
  const password = form.get("password") || "";
  const password_conf = form.get("password_conf") || "";
  const name = form.get("name") || "";
  const project = form.get("project") || "";
  const part = form.get("part") || "";
  //APIに変更
  console.log({
    email: email,
    password: password,
    password_conf: password_conf,
    name: name,
    project: project,
    part: part,
  });
};

export const Signup = () => {
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
    </>
  );
};
