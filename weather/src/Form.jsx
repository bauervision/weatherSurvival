import React, { useState } from "react";

const Form = ({ getWeather }) => {
    const [newZip, setNewZip] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(newZip)
        getWeather(newZip)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" name="zipcode" placeholder="Enter a new zipcode" onChange={(e) => setNewZip(e.target.value)} />

            <button>Submit</button>
        </form>
    );
};
export default Form;
