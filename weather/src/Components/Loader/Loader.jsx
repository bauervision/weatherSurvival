import React from "react";

import { default as Moon } from "./moon.png";

const Loader = ({ text }) => (
    <div className="flex alignItems">
        {text && <div className="kalamFont white">{text}</div>}
        <img src={Moon} alt="moon loader icon " className="rotate filter-white" />
    </div>
)
export default Loader;