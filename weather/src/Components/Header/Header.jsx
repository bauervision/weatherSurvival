import React from 'react';
import "./header-styles.scss";

const Header = ({ weatherData }) => {

    return (
        <div className="flex justifyBetween header">

            <div className="temp shadowsFont">{Math.round(weatherData?.main.temp)}<span className="smallFont">&#8457;</span></div>
            <div>{weatherData?.name}</div>
        </div>
    )
}
export default Header;