import React, { useState, useEffect } from "react";
import moment from 'moment';

import "./layout.css";
import "./styles.scss";

import firebase from "./config";

import LoginForm from "./Components/Login/LoginForm";
import Header from "./Components/Header/Header";
import Background from "./Components/Background/Background";
import { GenerateStoryLine } from "./Helpers/GenerateStory";
import { GenerateRegion } from "./Helpers/GenerateRegions";



export default function App() {
  // do we have a valid user logged in?
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const [weatherData, setWeather] = useState(null);
  const [region, setRegion] = useState(null);


  const getWeather = async (cityId) => {

    try {
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


  // when user logs in, we need to create their data account, if they are new
  const handleLogin = (userData, newUserData) => {

    const db = firebase.firestore();

    //console.log(userData, newUserData)
    if (newUserData) {
      // setup essential account data
      const newAccount = {
        id: userData.uid,
        name: newUserData.name,
        lastSignIn: Number(userData.metadata.a),
        // now generate storyline data
        storyLine: GenerateStoryLine(),
        storyRegion: GenerateRegion(),
        daysAlive: 0,

      }

      // save this to DB
      db.collection("users").doc(userData.uid).set(newAccount)
        .then(function () {
          console.log("Document successfully written!");
          // and set state
          setUserData(newAccount);
          getWeather(newAccount.storyRegion.code);

        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

    } else {
      const updatedData = {};
      // existing user, grab their data
      db.collection("users").doc(userData.uid).get().then((snap) => {
        const thisUser = snap.data();
        if (thisUser) {
          setUserData(thisUser);
          getWeather(thisUser.storyRegion.code);
          // update last login
          updatedData = { ...thisUser, lastSignIn: moment().toDate().getTime() }
        }
      });

      console.log(updatedData)
      // db.collection("users").doc(userData.uid).set(updatedData)
      //   .then(function () {
      //     console.log("Document successfully updated!");
      //   })
      //   .catch(function (error) {
      //     console.error("Error writing document: ", error);
      //   });



    }
    setUser(userData);


  }


  return (
    <div className="App">

      {/* User not logged in yet so display original setup */}
      {!user ? (
        <>
          <Background data="startNight" />
          <LoginForm handleLogin={handleLogin} />
          <h1 className="kalamFont white largeFont">Weather:Survival</h1>
          <p className="shadowsFont white">Do you have the skills to stay alive until rescue?</p>
        </>
      ) : (
          // User now logged in
          <>
            <Background data={weatherData?.weather[0]} />
            <Header weatherData={weatherData} userData={userData} />

            {/* Make sure we have valid userData */}
            {userData && (
              <div>
                <div className="kalamFont white largeFont">{userData.storyLine}</div>
                <div>Last Sign-in:{moment(userData.lastSignIn).fromNow()}</div>
              </div>
            )}
          </>
        )}



    </div >
  );
}
