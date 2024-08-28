import { useState } from "react";
import { MeansOfTransportationSwitch } from "./MeansOfTransportationSwitch.tsx";

interface StartStopButtonProps {
  onStopClick: () => void;
}

export const StartStopButton = ({ onStopClick }: StartStopButtonProps)  => {
  const API_BASE_URL = "http://localhost:3000/";

  const [watchStatus, setWatchStatus] = useState({
    isWatching: false,
    watchId: null,
    intervalId: null,
  });
  const [loclist, setLoclist] = useState([]);


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

      clearInterval(watchStatus.intervalId);
      navigator.geolocation.clearWatch(watchStatus.watchId);
      setWatchStatus({ isWatching: false, watchId: null, intervalId: null });

      fetch(`${API_BASE_URL}/api/v1/routes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loclist),
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
      <div>#StarStopButton</div>
      <MeansOfTransportationSwitch />

      {watchStatus.isWatching ? (
        <button onClick={stopWatchPosition}>Stop</button>
      ) : (
        <button onClick={startWatchPosition}>Start</button>
      )}
    </>
  );
};
