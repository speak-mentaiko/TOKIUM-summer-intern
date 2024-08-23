import { useState } from 'react';
import './App.css';

function App() {
  const API_BASE_URL = 'http://localhost:3000/'

  const [watchStatus, setWatchStatus] = useState({
    isWatching: false,
    watchId: null,
    intervalId: null
  });
  // const [loclist, setLoclist] = useState([])
    let loclist = [];

    const startWatchPosition = () =>{
      if (!watchStatus.isWatching){
        let lat, lon;

      const watchId = navigator.geolocation.watchPosition(position => {   
        lat = position.coords.latitude;
        lon = position.coords.longitude;
      });

        const intervalId = setInterval(() => {
          // setLoclist((prevLoclist) => {
          //   return [...prevLoclist, 
          //     {latitude: lat, longitude: lon}]
          // });
        loclist.push({latitude: lat, longitude: lon});
        }, 10000); 

      setWatchStatus({isWatching: true, watchId, intervalId });
        }
  };

    const stopWatchPosition = () => {
    if (watchStatus.isWatching) {
      clearInterval(watchStatus.intervalId);
      navigator.geolocation.clearWatch(watchStatus.watchId);
      setWatchStatus({isWatching: false, watchId: null, intervalId: null});

      fetch(`${API_BASE_URL}/route`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location : loclist
        })
      })
      .then(response => response.json())
      // ユーザーidをつけるならここで追加

      // setLoclist ((prevLoclist) => {
      //   return [];
      // });
      loclist = [];
      };
    };

  return (
    <>
        <button onClick = {startWatchPosition}>位置情報取得開始</button>
        <button onClick = {stopWatchPosition}>位置情報取得終了</button>
    </>
  )
}

export default App;
