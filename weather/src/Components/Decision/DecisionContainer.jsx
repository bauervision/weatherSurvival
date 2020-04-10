import React from 'react';

import DecisionSelect from "./DecisionSelect";

import './decision-styles.scss';

const DecisionContainer = () => {

    const DecisionItem = ({ data, label, name }) => (

        <div className="decision shadowsFont white mediumFont">
            <div className="shadowed">{label}</div>
            <DecisionSelect
                data={data}
                name={name}
                width={300}
            />
        </div>

    )

    return (
        <div className="flex col justifyCenter topMargin">
            <div>
                <h2>Each day you have 2 important decisions to make:</h2>
            </div>

            <div className="flex">
                <DecisionItem
                    data={['Select...', 'Find Water', 'Find Food', 'Rest', 'Build Something']}
                    label="What is your first priority today?"
                    name="First choice" />

                <DecisionItem
                    data={['Select...', 'Explore', 'Hunker down', 'Get Rest']}
                    label="How are you going to do prepare for tonight?"
                    name="Third choice" />
            </div>
        </div>
    )
}
export default DecisionContainer;