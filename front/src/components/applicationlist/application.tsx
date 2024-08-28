import React from 'react';

export const Application = ({application}) => {
  return (<>
    <div>{application.name}</div>
    <div>{application.id}</div>
    </>
  )
};