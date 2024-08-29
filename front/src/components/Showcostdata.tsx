import { costData } from "../types/costData";

export const ShowCostData = (props: costData) => {
  return (
    <>
      <div>
        <p>date:{props?.date}</p>
        <p>visit:{props?.visit}</p>
        <p>ca:{props?.ca}</p>
        <ul>
          <li>from:{props?.route_from}</li>
          <li>via0:{props?.route_via0}</li>
          <li>via1:{props?.route_via1}</li>
          <li>via2:{props?.route_via2}</li>
          <li>via3:{props?.route_via3}</li>
          <li>via4:{props?.route_via4}</li>
          <li>to:{props?.route_to}</li>
        </ul>
        <p>amount:{props?.route_amount}</p>
        <p>memo:{props?.memo}</p>
      </div>
    </>
  );
};
