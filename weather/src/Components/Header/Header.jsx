import React from 'react';
import "./header-styles.scss";

const Header = ({ weatherData, userData }) => {

    return (
        <div className="flex justifyBetween header alignItems">
            <div className="temp shadowsFont">{Math.round(weatherData?.main.temp)}<span className="smallFont">&#8457;</span></div>
            <div className="rightSide shadowsFont white ">Day:<span className="largeFont">{userData?.daysAlive}</span></div>
        </div>
    )
}
export default Header;