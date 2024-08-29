import { atom } from "recoil";

type userData = {
  user_id: string;
  email: string;
  name: string;
  project: string;
  part: string;
};

const getToLocalStorage = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const value = window.localStorage.getItem("userId");
  return value ? value : "";
};

const saveToLocalStorage = (value: userData) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem("userId", JSON.stringify(value));
};

export const userState = atom<string>({
  key: "userId",
  default: getToLocalStorage(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveToLocalStorage(newValue);
      });
    },
  ],
});
