import { atom } from "recoil";

const getToLocalStorage = () => {
  if (typeof window === "undefined") {
    return "";
  }
  const value = window.localStorage.getItem("userId");
  return value ? value : "";
};

const saveToLocalStorage = (value: string) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem("userId", value);
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
