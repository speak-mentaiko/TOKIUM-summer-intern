import { Link } from "react-router-dom";
import { cost } from "../types/cost";

export const ApprovalCard = (props: cost) => {
  console.log(props);
  return (
    <>
      <Link to={`/list/approval/${props.cost_id}`}>
        <dev className={"m-1"}>
          <div>{props.date}</div>
          <div>{props.visit}</div>
        </dev>
      </Link>
    </>
  );
};
