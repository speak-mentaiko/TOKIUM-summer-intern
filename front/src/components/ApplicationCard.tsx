import { Link } from "react-router-dom";

export const ApplicationCard = ({ application }) => {
  return (
    <>
      <Link to={`/list/application/${application.cost_id}`}>
        <dev className={"m-1"}>
          <div>{application.date}</div>
          <div>{application.visit}</div>
        </dev>
      </Link>
    </>
  );
};
