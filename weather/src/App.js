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
import Loader from "./Components/Loader/Loader";
import BottomDrawer from "./Components/BottomDrawer/BottomDrawer";
import DecisionContainer from "./Components/Decision/DecisionContainer";


export default function App() {

  const [user, setUser] = useState(null); // do we have a valid user logged in?
  const [userData, setUserData] = useState(null);// users account info
  const [weatherData, setWeather] = useState(null);
  const [forecastData, setForecast] = useState(null);
  const [checkingForUser, setCheckingForUser] = useState(true);

  const handleLogOut = () => {
    setCheckingForUser(false)
    setUser(null)
    setUserData(null)
    setWeather(null)
  }

  // check to see if user is still logged in, on mount
  useEffect(() => {
    if (!user) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // if firebase returns a user, then we need to grab their data
          setUser(user)
          fetchUserData(user);
        } else {
          // no user = logged out, so handle logged out status
          handleLogOut();
        }
      });
    }
  }, [])


  const getWeather = async (cityId) => {

    try {
      const call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=imperial&APPID=5a7e69f03ea555885635187a0bbb2049`
      );
      const weatherData = await call.json();
      // console.log(weatherData)
      setWeather(weatherData)
    } catch (err) {
      console.error(err)
    }

  };

  const getForecast = async (cityId) => {

    try {
      const call = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=imperial&APPID=5a7e69f03ea555885635187a0bbb2049`
      );
      const forecast = await call.json();
      console.log(forecast, "current time:",
        moment(forecast.list[0].dt).format('HH:MM'),
        moment(forecast.list[1].dt).format('HH:MM'),
        moment(forecast.list[2].dt).format('HH:MM'),
        moment(forecast.list[3].dt).format('HH:MM'),

      )
      setForecast(forecast)
    } catch (err) {
      console.error(err)
    }

  };


  const fetchUserData = (userData) => {
    const db = firebase.firestore();
    // existing user, grab their data
    db.collection("users").doc(userData.uid).get().then((snap) => {
      const thisUser = snap.data();
      if (thisUser) {

        const created = moment(Number(userData.metadata.a));
        const lastSignIn = moment(Number(userData.metadata.b)).toNow();
        const now = moment();
        const daysAlive = Math.abs(created.diff(now, 'days'))

        setUserData({
          ...thisUser,
          lastSignIn,
          daysAlive
        });

        // grab all weather related data
        getWeather(thisUser.storyRegion.code);
        getForecast(thisUser.storyRegion.code);

        // update last login
        db.collection("users").doc(userData.uid).set(
          {
            ...thisUser,
            lastSignIn,
            daysAlive: 0
          })
          .then(function () {
            console.log("Document successfully updated!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });

      }
    });

  }

  // when user logs in, we need to create their data account, if they are new
  const handleLogin = (userData, newUserData) => {

    const db = firebase.firestore();

    console.log(userData, newUserData)
    if (newUserData) {
      // setup essential account data
      const newAccount = {
        id: userData.uid,
        name: newUserData.name,
        startDate: Number(userData.metadata.a),
        lastSignIn: Number(userData.metadata.b),
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
      fetchUserData(userData)
    }
    setUser(userData);
  }


  return (
    <div className="App">

      {/* User not logged in yet so display original setup */}
      {!user ? (
        <>
          <Background data="startNight" />
          {!checkingForUser ?
            (<>
              <LoginForm handleLogin={handleLogin} />

              <h1 className="kalamFont white largeFont">Weather:Survival</h1>
              <p className="shadowsFont white">Do you have the skills to stay alive until rescue?</p>
            </>) : (
              <div className="flex justifyCenter alignItems">
                <Loader text="Getting User Status..." />
              </div>
            )
          }
        </>
      ) : (
          // User now logged in
          <>
            {!weatherData ? (
              <div className="flex justifyCenter alignItems">
                <Loader text="Getting Current Weather..." />
                <Background />

              </div>
            ) : (
                <>
                  <Background data={weatherData?.weather[0]} />

                  {/* Make sure we have valid userData */}
                  {userData && (
                    <>
                      <Header weatherData={weatherData} userData={userData} />
                      <div>
                        <div className="kalamFont white largeFont">{userData.storyLine}</div>
                        <div>Last Sign-in:{userData.lastSignIn}</div>
                        <DecisionContainer />
                      </div>

                      <BottomDrawer handleLogOut={handleLogOut} />
                    </>
                  )}
                </>
              )}
          </>
        )}



    </div >
  );
}
