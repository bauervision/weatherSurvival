import React from "react";

const PasswordInput = ({
    handlePasswordVisibility,
    setPassword,
    password,
    passwordType,
    error
}) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
                {/* Label */}
                <div>
                    <label htmlFor="password">Password:</label>
                </div>

                {/* Button */}
                <div>
                    <div style={{ position: "relative" }}>
                        {/* Toggle Visibility Button */}
                        {password && (
                            <button
                                type="button"
                                onClick={handlePasswordVisibility}
                                title="Show your password"
                                style={{
                                    position: "absolute",
                                    top: "1em",
                                    right: "0.5em"
                                }}
                            >
                                !
                            </button>
                        )}

                        <input
                            className={error ? "emailInputError" : ""}
                            placeholder="Enter your Password"
                            type={passwordType}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PasswordInput;
