import { Link } from "react-router-dom";

export const ApplicationCard = ({ application }) => {
  console.log("test");
  return (
    <>
    <div className = 'bg-pink-50'>
      <Link to={`/list/application/${application.cost_id}`}>
        <dev className={"m-1"}>
          <div>{application.date}</div>
          <div>{application.visit}</div>
        </dev>
      </Link>
    </div>
    </>
  );
};
