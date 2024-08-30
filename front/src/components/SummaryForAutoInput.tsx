import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { routeData } from "../hooks/routeState";

interface SummaryForAutoInputProps {
  onStartClick: () => void;
}

export const SummaryForAutoInput = ({
  onStartClick,
}: SummaryForAutoInputProps) => {
  const goStartPage = () => {
    onStartClick();
  };

  const navigate = useNavigate();

  const route = useRecoilValue(routeData);

  const goToRouteRegistration = () => {
    navigate("./registration", { state: { route } });
  };

  console.log(route);

  return (
    <>
      <div>#SummaryForAutoInput</div>
      {route.costs === "Route not found" ? (
        <p>ルートが見つかりませんでした</p>
      ) : (
        <ul>
          <li>出発地：{route.from}</li>
          <li>到着地：{route.to}</li>
          <li>距離：{route.distance}</li>
          <li>金額：{route.costs}</li>
        </ul>
      )}
      {() => {
        if (route.costs === "") {
          return <p>計算中</p>;
        } else if (route.costs === "Route not found") {
          return <p>ルートが見つかりませんでした</p>;
        } else {
          return (
            <>
              <ul>
                <li>出発地：{route.from}</li>
                <li>到着地：{route.to}</li>
                <li>距離：{route.distance}</li>
                <li>金額：{route.costs}</li>
              </ul>
              <button onClick={goToRouteRegistration}>申請</button>
            </>
          );
        }
      }}
      <button onClick={goStartPage}>Home</button>
    </>
  );
};
