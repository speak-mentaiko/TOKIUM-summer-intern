import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { BsTrainFront } from "react-icons/bs";
import { BsTaxiFront } from "react-icons/bs";
import { BsCarFrontFill } from "react-icons/bs";

import { userState } from "../hooks/userState.ts";
import { routeData } from "../hooks/routeState.ts";

interface StartStopButtonProps {
  onStopClick: () => void;
}

export const StartStopButton = ({ onStopClick }: StartStopButtonProps) => {
  const API_BASE_URL = "http://localhost:3000/";
  const userId = useRecoilValue(userState);
  const [route, setRoute] = useRecoilState(routeData);

  const [watchStatus, setWatchStatus] = useState({
    isWatching: false,
    watchId: null,
    intervalId: null,
  });
  const [loclist, setLoclist] = useState([]);
  const [meansOfTransport, setMeansOfTransport] = useState("public transport");

  const handleTransportChange = (event) => {
    setMeansOfTransport(event.target.value);
  };

  const startWatchPosition = () => {
    if (!watchStatus.isWatching) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLoclist([
          {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          },
        ]);
      });

      let lon, lat;
      const watchId = navigator.geolocation.watchPosition((position) => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;
      });

      const intervalId = setInterval(() => {
        setLoclist((prevLoclist) => {
          return [...prevLoclist, { longitude: lon, latitude: lat }];
        });
      }, 10000);

      setWatchStatus({ isWatching: true, watchId, intervalId });
    }
  };

  const stopWatchPosition = () => {
    if (watchStatus.isWatching) {
      console.log(JSON.stringify(loclist));
      const routeForPost = JSON.stringify({
        user_id: userId,
        way: meansOfTransport,
        data: loclist,
      });
      console.log(routeForPost);

      clearInterval(watchStatus.intervalId);
      navigator.geolocation.clearWatch(watchStatus.watchId);
      setWatchStatus({ isWatching: false, watchId: null, intervalId: null });

      fetch(`${API_BASE_URL}api/v2/routes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: routeForPost,
      })
        .then((response) => response.json())
        .then((data) => {
          setRoute(data);
          console.log(data);
        })
        .catch((error) => {
          setRoute(error);
          console.log(error);
        });

      setLoclist(() => {
        return [];
      });

      onStopClick();
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <ul className="flex w-full gap-6 justify-between">
            <li className="flex-1 last:mr-0">
              <input
                type="radio"
                id="contactChoice1"
                name="contact"
                value="company car"
                checked={meansOfTransport === "company car"}
                onChange={handleTransportChange}
                className="hidden peer"
              />
              <label
                htmlFor="contactChoice1"
                className="inline-flex items-center  w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                社用車
                <BsCarFrontFill />
              </label>
            </li>

            <li className="flex-1 last:mr-0">
              <input
                type="radio"
                id="contactChoice2"
                name="contact"
                value="public transport"
                checked={meansOfTransport === "public transport"}
                onChange={handleTransportChange}
                className="hidden peer"
              />

              <label
                htmlFor="contactChoice2"
                className="inline-flex items-center  w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                公共交通機関
                <BsTrainFront />
              </label>
            </li>

            <li className="flex-1 last:mr-0">
              <input
                type="radio"
                id="contactChoice3"
                name="contact"
                value="taxi"
                checked={meansOfTransport === "taxi"}
                onChange={handleTransportChange}
                className="hidden peer"
              />
              <label
                htmlFor="contactChoice3"
                className="inline-flex items-center  w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                タクシー
                <div>
                  <BsTaxiFront />
                </div>
              </label>
            </li>
          </ul>
        </fieldset>
      </form>

      {watchStatus.isWatching ? (
        <button
          className={
            "flex justify-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          }
          onClick={stopWatchPosition}
        >
          Stop
        </button>
      ) : (
        <button
          className={
            "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          }
          onClick={startWatchPosition}
        >
          Start
        </button>
      )}
    </>
  );
};
