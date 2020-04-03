import React from 'react';

import * as images from "./images";

/* Background handles which images to display */
const Background = ({ data }) => {

    const getCorrectImage = () => {

        switch (data.main) {
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
                    case 521: return images.Showers;
                    default: return images.Rain;
                }
            }
            case 'Thunderstorm': return images.ThunderStorm;
            case 'Snow': return images.Snow;
            case 'Mist': return images.Mist;
            default: return images.ClearSky;
        }
    }

    return (data ? <img src={getCorrectImage()} alt="background" className="backgroundImg" /> : null
    )
};
export default Background;