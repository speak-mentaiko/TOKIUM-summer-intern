import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { routeData } from "../hooks/routeState";

interface SummaryForAutoInputProps {
  onStartClick: () => void;
}

export const SummaryForAutoInput = ({
  onStartClick,
}: SummaryForAutoInputProps) => {
  const navigate = useNavigate();
  const [route, setRoute] = useRecoilState(routeData);

  const goStartPage = () => {
    setRoute({
      from: "",
      via0: null,
      via1: null,
      via2: null,
      via3: null,
      via4: null,
      via5: null,
      to: "",
      distance: 0,
      costs: "",
    });
    onStartClick();
  };

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
      <button onClick={goStartPage}>Home</button>
    </>
  );
};
