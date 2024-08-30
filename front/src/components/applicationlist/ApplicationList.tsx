import React from "react";
import { Application } from "./Application.tsx";

export const ApplicationList = ({ applicationListItems }) => {
console.log(applicationListItems)

  return applicationListItems.map((application) => (
    <Application application={application} key={application.id} />
  ));
};
