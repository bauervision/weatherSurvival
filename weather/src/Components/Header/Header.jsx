import React from 'react';
import moment from 'moment';

import "./header-styles.scss";

const Header = ({ weatherData, userData }) => {

    return (
        <div className="flex justifyBetween header alignItems">
            <div className="temp shadowsFont">{Math.round(weatherData?.main.feels_like)}<span className="smallFont">&#8457;</span></div>
            <div className="rightSide shadowsFont white " >Day:<span className="largeFont" style={{ marginLeft: '4px' }}>{userData?.daysAlive}</span></div>
        </div>
    )
}
export default Header;