import { useState } from 'react';
import './App.css';

function App() {
  const API_BASE_URL = 'http://localhost:3000/'

  const [watchStatus, setWatchStatus] = useState({
    isWatching: false,
    watchId: null,
    intervalId: null
  });
  const [fromTo,setFromTo] = useState({
    "from": null,
    "to": null
  });
  const [loclist, setLoclist] = useState([])
    // useStateで問題が生じたらletでloclistを貼ればいいかも

    const startWatchPosition = () =>{
      if (!watchStatus.isWatching){
        navigator.geolocation.getCurrentPosition(position => {
          setLoclist([{longitude: position.coords.longitude, latitude: position.coords.latitude}])
        });

        let lon, lat;
      const watchId = navigator.geolocation.watchPosition(position => {   
        lon = position.coords.longitude;
        lat = position.coords.latitude;
      });

        const intervalId = setInterval(() => {
          setLoclist((prevLoclist) => {
            return [...prevLoclist, 
              {longitude: lon, latitude: lat}]
          });
        }, 1000); 

      setWatchStatus({isWatching: true, watchId, intervalId });
        }
  };

    const stopWatchPosition = () => {
    if (watchStatus.isWatching) {
      console.log(JSON.stringify(loclist))

      clearInterval(watchStatus.intervalId);
      navigator.geolocation.clearWatch(watchStatus.watchId);
      setWatchStatus({isWatching: false, watchId: null, intervalId: null});

      fetch(`${API_BASE_URL}/api/v1/routes`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loclist)
      })
      .then(response => response.json())
      .then((data) => {
        setFromTo(data);
        console.log(data); 
      })
      .then(() => console.log(fromTo))
      .catch(error => console.log(error)); 

      setLoclist (() => {
        return [];
      });
      };
    };

  return (
    <>
        <button onClick = {startWatchPosition}>位置情報取得開始</button>
        <button onClick = {stopWatchPosition}>位置情報取得終了</button>
        <div>
        </div>

    </>
  )
}

export default App;
