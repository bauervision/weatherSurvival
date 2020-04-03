import React from "react";

const BasicInput = ({
    title,
    type,
    forLabel,
    onChange,
    value,
    isFile,
    placeholder,
    error
}) => {
    const handleChange = e => {
        if (isFile) {
            e.preventDefault();
        }

        // if we are setting a file, pass both the file and file value
        onChange(isFile ? (e.target.files[0], e.target.value) : e.target.value);
    };
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
                <div>
                    <label htmlFor={forLabel}>{title}:</label>
                </div>

                <input
                    className={error ? "emailInputError" : ""}
                    placeholder={placeholder}
                    type={type}
                    name={forLabel}
                    value={value}
                    onChange={e => handleChange(e)}
                />
            </div>
        </div>
    );
};

export default BasicInput;
