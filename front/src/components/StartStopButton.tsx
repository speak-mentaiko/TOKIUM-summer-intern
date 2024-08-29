import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../hooks/userState.ts";

interface StartStopButtonProps {
  onStopClick: () => void;
}

export const StartStopButton = ({ onStopClick }: StartStopButtonProps) => {
  const API_BASE_URL = "http://localhost:3000/";
  const userId = useRecoilValue(userState);
  // console.log(userId)

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
          console.log(data);
        })
        .catch((error) => console.log(error));

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
          <div>
            <input
              type="radio"
              id="contactChoice1"
              name="contact"
              value="company car"
              checked={meansOfTransport === "company car"}
              onChange={handleTransportChange}
              class="hidden peer"
            />
            <label htmlFor="contactChoice1" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">社用車</label>
          </div>

          <div>
            <input
              type="radio"
              id="contactChoice2"
              name="contact"
              value="public transport"
              checked={meansOfTransport === "public transport"}
              onChange={handleTransportChange}
              class="hidden peer"
            />
            <label htmlFor="contactChoice2" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">公共交通機関</label>
          </div>
          <div>
            <input
              type="radio"
              id="contactChoice3"
              name="contact"
              value="taxi"
              checked={meansOfTransport === "taxi"}
              onChange={handleTransportChange}
              class="hidden peer"
            />
            <label htmlFor="contactChoice3" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">タクシー</label>
          </div>
        </fieldset>
      </form>

      {watchStatus.isWatching ? (
        <button onClick={stopWatchPosition}>Stop</button>
      ) : (
        <button onClick={startWatchPosition}>Start</button>
      )}
    </>
  );
};
