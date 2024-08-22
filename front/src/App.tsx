import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const API_BASE_URL = 'http://localhost:3000/'

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/hello`)
      .then((res) => res.json())
  }, [])

  const [location, setLocation] = useState({latitude: null, longitude: null})

  const getLocation = () =>{
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({
            latitude: lat,
            longitude: lon
          });

      fetch(`${API_BASE_URL}/route`,{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: lat,
          longitude: lon,
        })
      })
      .then(response => response.json())
        }
    )};

  return (
    <>
        <button onClick = {getLocation}>位置情報を取得</button>
      <div>
        {location.latitude}
      </div>
      <div>
        {location.longitude}
      </div>
    </>
  )
}

export default App;
