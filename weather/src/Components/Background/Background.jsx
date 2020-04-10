import React from 'react';

import * as images from "./images";

/* Background handles which images to display */
const Background = ({ data }) => {

    const getCorrectImage = () => {

        switch (data.main) {
            case 'Drizzle': {
                switch (data.id) {
                    // case 300: return images.Few;
                    // case 301: return images.Scattered
                    // case 302: return images.Broken;
                    default: return images.Drizzle;
                }
            }

            case 'Clouds': {
                //clouds has a few images to use
                switch (data.id) {
                    case 801: return images.Few;
                    case 802: return images.Scattered
                    case 803: return images.Broken;
                    default: return images.Overcast;
                }
            }

            case 'Rain': {
                switch (data.id) {
                    // case 500: return ; lightrain
                    // case 501: return ; moderate rain
                    // case 502: return ; heavy intensity rain
                    // case 503: return ; very heavy rain
                    // case 504: return ; extreme rain
                    // case 511: return ; freezing rain
                    // case 520: return ; light intensity shower rain
                    case 521: return images.Showers;
                    // case 522: return ; heavy intensity shower rain
                    // case 531: return ; ragged sower rain
                    default: return images.Rain;
                }
            }
            case 'Thunderstorm': return images.ThunderStorm;

            case 'Snow': switch (data.id) {
                // case 600: return images.Few; light snow
                // case 601: return images.Scattered; snow
                // case 602: return images.Broken; heavy snow
                // case 611: return images.Broken; sleet
                // case 612: return images.Broken; light shower sleet
                // case 613: return images.Broken; shower sleet
                // case 615: return images.Broken; light rain and snow
                // case 616: return images.Broken; rain and snow
                // case 620: return images.Broken; light shower snow
                // case 621: return images.Broken; shower snow
                // case 622: return images.Broken; heavy shower snow
                default: return images.Snow;
            }
            case 'Mist': return images.Mist;
            case 'Clear': return images.ClearSky
            default: return images.StartNight;
        }
    }


    return (data ? <img src={getCorrectImage()} alt="background" className="backgroundImg" /> : <img src={images.StartNight} alt="background" className="backgroundImg" />
    )
};
export default Background;