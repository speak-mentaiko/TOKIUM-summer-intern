import { Link } from "react-router-dom";
import { PiMapPinLight } from "react-icons/pi";
import { HiMiniCalendarDays } from "react-icons/hi2";

import { cost } from "../types/cost";

export const ApprovalCard = (props: cost) => {
  console.log(props);
  return (
    <>
      <div className={"w-500 h-auto rounded-8 bg-pink-100"}>
        <Link to={`/list/approval/${props.cost_id}`}>
          <dev>
            <div className={"flex justify-center gap-4 p-4"}>
              <HiMiniCalendarDays />
              {props.date}
            </div>
            <div className={"flex justify-center gap-4 p-4"}>
              <PiMapPinLight />
              {props.visit}
            </div>
          </dev>
        </Link>
      </div>
    </>
  );
};
