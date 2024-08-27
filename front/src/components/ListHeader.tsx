import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ListHeader = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/auto');
      };

  return (<>
    <div>#ListHeader</div>
    <button onClick = {handleBackToHome}>戻る</button>
    </>
  )
};