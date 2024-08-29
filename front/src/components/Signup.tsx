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
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign up to your new account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={signUpSubmit}>
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
                  <div>
                    <label htmlFor="password_confirm"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password_confirm</label>
                    <input type="password" name="password_confirm" id="password_confirm" placeholder="••••••••"
                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required="1"/>
                  </div>
                  <div>
                    <label htmlFor="name"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="text" name="name" id="name" placeholder=""
                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required="1"/>
                  </div>
                  <div>
                    <label htmlFor="project"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project name</label>
                    <input type="text" name="project" id="project" placeholder=""
                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required="1"/>
                  </div>
                  <div>
                    <label htmlFor="role"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your part name</label>
                    <input type="text" name="part" id="project" placeholder=""
                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required="1"/>
                  </div>
                  <button type="submit"
                          className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer outline-none">Sign
                    up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </>
  )
      ;
};
