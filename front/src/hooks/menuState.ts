import { createContext } from "react";

export const menuContext = createContext({
  isOpend: false,
  setOpened: (isOpen: boolean) => {},
});
