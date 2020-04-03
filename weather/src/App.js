import React, { useState, useEffect } from "react";

import "./layout.css";
import "./styles.scss";

import firebase from "./config";

import LoginForm from "./Components/Login/LoginForm";
import Header from "./Components/Header/Header";
import Background from "./Components/Background";

// city codes for intial region selections
const regions = [
  { city: 'Tumbes', code: '3691148' },
  { city: 'Gallegos', code: '3838859' },
  { city: 'Kitimat', code: '5993072' },
  { city: 'Eastport', code: '5116149' },
  { city: 'Woodward', code: '4556050' },
  { city: 'Lae', code: '2092740' },
  { city: 'Stockholm', code: '2673730' }
]

export default function App() {
  const [user, setUser] = useState(null);

  const [weatherData, setWeather] = useState(null);
  const [region, setRegion] = useState(null);

  // get random region on mount, and then get its weather
  useEffect(() => {
    getWeather();

  }, []);


  const getWeather = async () => {

    const db = firebase.firestore();
    db.collection("users").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });

    try {

      setRegion(regions[Math.floor(Math.random() * regions.length)]);
      const cityId = regions[Math.floor(Math.random() * regions.length)].code;

      const call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=imperial&APPID=5a7e69f03ea555885635187a0bbb2049`
      );
      const weatherData = await call.json();
      console.log(weatherData)
      setWeather(weatherData)
    } catch (err) {
      console.error(err)
    }

  };


  const handleLogin = (userData) => {
    setUser(userData);
    console.log(userData)
  }
  return (
    <div className="App">





      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
          <>
            <Header weatherData={weatherData} />
          </>
        )}


      <Background data={weatherData?.weather[0]} />
    </div>
  );
}
