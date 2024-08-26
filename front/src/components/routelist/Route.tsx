import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Route = ({route}) => {
  const navigate = useNavigate();
  const goToRouteRegistration = () =>{
    navigate('./registration', { state: { route } });
  }

  return (<>
    <div>{route.from}</div>
    <div>{route.to}</div>
    <button onClick = {goToRouteRegistration}>登録</button>
    </>
  )
};