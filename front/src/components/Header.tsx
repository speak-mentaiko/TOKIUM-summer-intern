// import { Hamburger } from "./Hamburger";
import { Setting } from "./Setting";

import { useIsSidebarOpenMutator } from '../hooks/isSidebarOpen';
import { RxHamburgerMenu } from 'react-icons/rx';


interface HeaderProps {
  onToggleIsSidebarOpen: () => void;
}

export const Header = ({onToggleIsSidebarOpen}: HeaderProps) => {
  return (
    <header className={'h-88 flex justify-between items-center p-20 bg-pink-50'}>
      {/* <Hamburger /> */}
      <button
        className={'cursor-pointer'}
        onClick={() => onToggleIsSidebarOpen()}
      >
        <RxHamburgerMenu size={24} />
      </button>
      <p className={'ml-10 text-18'} >This is Oden App</p>
      <Setting />
    </header>
  );
};
