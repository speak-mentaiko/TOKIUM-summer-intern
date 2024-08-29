import React from 'react';

export const Application = ({application}) => {

  return (<>
    <div>{application.route_from}</div>
    <div>{application.route_to}</div>
    <div>こんにちは</div>
    </>
  )
};