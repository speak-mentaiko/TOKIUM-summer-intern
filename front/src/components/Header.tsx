import { Hamburger } from "./Hamburger";
import { Setting } from "./Setting";

interface HeaderProps {
  onAppearClick: () => void;
}

export const Header = () => {
  return (
    <>
      <div>#Header</div>
      <Hamburger />
      <Setting />
    </>
  );
};
