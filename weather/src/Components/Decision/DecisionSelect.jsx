import React from 'react';

const DecisionSelect = ({ data, onChange, width, value, name }) => (
    <select
        name={name}
        className="InputStyle"
        onChange={(e) => onChange(e.target.value)}
        style={{ width }}
        value={value}>
        {data.map((elem) => <option key={elem} value={elem}>{elem}</option>)}
    </select>
)
export default DecisionSelect;