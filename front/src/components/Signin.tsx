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
          setUserId(json);
          navigate("/home");
        } else {
          setError(json.error);
        }
      });
  };

  return (

  <>
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={signInSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                  email</label>
                <input type="email" name="email" id="email"
                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       defaultValue="" required="1"/>
              </div>
              <div>
                <label htmlFor="password"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••"
                       className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       required="1"/>
              </div>
              <button type="submit"
                      className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer outline-none">Sign in</button>

            </form>
          </div>
        </div>
      </div>
    </section>

  </>
);
};
