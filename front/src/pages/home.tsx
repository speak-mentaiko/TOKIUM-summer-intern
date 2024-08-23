import { useEffect, useState } from "react";
//import "./App.css";

export const Home = () => {
  const API_BASE_URL = "http://localhost:3000/";

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/hello`).then((res) => res.json());
  }, []);

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [watchStatus, setWatchStatus] = useState({
    isWatching: false,
    watchId: null,
  });
  const [loclist, setLoclist] = useState([]);

  // const getLocation = () =>{
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const lat = position.coords.latitude;
  //         const lon = position.coords.longitude;
  //         setLocation({
  //           latitude: lat,
  //           longitude: lon
  //         });

  //     fetch(`${API_BASE_URL}/route`,{
  //       method : 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         latitude: lat,
  //         longitude: lon,
  //       })
  //     })
  //     .then(response => response.json())
  //       }
  //   )};

  const startWatchPosition = () => {
    if (!watchStatus.iswatching) {
      const watchId = navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLocation({
          latitude: lat,
          longitude: lon,
        });

        setWatchStatus({ isWatching: true, watchId });

        setLoclist((prevLoclist) => {
          return [...prevLoclist, { latitude: lat, longitude: lon }];
        });
      });
    }
  };

  const stopWatchPosition = () => {
    if (watchStatus.isWatching) {
      navigator.geolocation.clearWatch(watchStatus.watchId);
      setWatchStatus({ isWatching: false, watchId: null });

      console.log(loclist);

      fetch(`${API_BASE_URL}/route`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: loclist,
        }),
      }).then((response) => response.json());
      // ユーザーidをつけるならここで追加

      setLoclist([]);
    }
  };

  return (
    <>
      {/* <button onClick = {getLocation}>位置情報を取得</button> */}
      <button onClick={startWatchPosition}>位置情報取得開始</button>
      <button onClick={stopWatchPosition}>位置情報取得終了</button>
      <div>{location.latitude}</div>
      <div>{location.longitude}</div>
    </>
  );
};
