import { costData } from "../types/costData";

export const ShowCostData = (props: costData) => {
  return (
    <>
      <div className={"m-2 space-y-2 text-18"}>
        <p>利用日：{props?.date}</p>
        <p>訪問先：{props?.visit}</p>
        <p>経費科目：{props?.ca}</p>
        <ul>
          <li>出発地：{props?.route_from}</li>
          {() => {
            if (props?.route_via0) {
              return (
                <>
                  <li>経由地：{props?.route_via0}</li>
                  <li>via1：{props?.route_via1}</li>
                  <li>via2：{props?.route_via2}</li>
                  <li>via3：{props?.route_via3}</li>
                  <li>via4：{props?.route_via4}</li>
                </>
              );
            }
          }}
          <li>到着地：{props?.route_to}</li>
        </ul>
        <p>金額：{props?.route_amount}</p>
        <p>メモ：{props?.memo}</p>
      </div>
    </>
  );
};
