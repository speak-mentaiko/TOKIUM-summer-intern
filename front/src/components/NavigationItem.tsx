import { Link } from 'react-router-dom';
import { IconType } from 'react-icons/lib';

type Props = {
  Icon: IconType;
  to: string;
  name: string;
};

export const NavigationItem = ({ Icon, to, name }: Props) => {
  return (
    <Link to={to} className={` w-100p rounded-8 flex items-center p-12 text-14 text-white duration-200 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/50`}>
      <Icon color={'white'} size={24} />
      <p className={'ml-10'}>{name}</p>
    </Link>
  );
};
