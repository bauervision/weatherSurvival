import React, { useState, useEffect, useCallback } from "react";
import BasicInput from "./BasicInput";
import PasswordInput from "./PasswordInput";
import "./styles.css";

const LoginForm = ({ registerUser, handleLogin }) => {
    const [existingUser, setExistingUser] = useState(true);
    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);
    const [loginError, setLoginError] = useState(null);
    const [email, setEmailLogin] = useState("");
    const [password, setPasswordLogin] = useState("");
    const [name, setNameLogin] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [loadingUser, setLoadingUser] = useState(false);

    const handleExistingLogin = e => {
        e.preventDefault();
        setLoadingUser(true);
    };

    const handleSubmitLogin = useCallback(async () => {
        setLoadingUser(true);
        const status = await registerUser(email, password);

        // if we didn't get a user back, then there was an error
        if (!status.user) {
            setLoadingUser(false);
            const errorMessage = status.error.message;
            setLoginError(errorMessage);
        } else {
            // otherwise we had a successful login
            handleLogin(status.user);
        }
    }, [email, handleLogin, password, registerUser]);

    useEffect(() => {
        if (loadingUser) {
            handleSubmitLogin();
        }
    }, [handleSubmitLogin, loadingUser]);

    const validEmailRegex = RegExp(
        // eslint-disable-next-line
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    const handleSubmitNew = async e => {
        e.preventDefault();

        const newUserData = {
            email,
            password,
            name
        };

        const status = await registerUser(email, password);

        if (!status.user) {
            const errorMessage = status.error.message;
            setLoginError(errorMessage);
        } else if (status) {
            // otherwise we had a successful login
            handleLogin(status.user, newUserData);
        }
    };

    const setEmail = e => {
        const error = validEmailRegex.test(e) ? "" : "Email is not valid!";
        setEmailError(error);
        setEmailLogin(e);
    };

    const setPassword = pw => {
        const error = pw.length < 6;
        setPasswordError(error);
        setPasswordLogin(pw);
    };

    const handlePasswordVisibility = () => {
        setPasswordType(!showPassword ? "text" : "password");
        setShowPassword(!showPassword);
    };

    const handleUserTypeSwitch = () => {
        setExistingUser(!existingUser);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}
        >


            {existingUser ? (
                <form onSubmit={handleExistingLogin}>
                    <div>
                        <h3 style={{ textAlign: "center" }}>Welcome Back!</h3>

                        <div>
                            <BasicInput
                                title="Email"
                                type="email"
                                forLabel="email"
                                onChange={setEmail}
                                value={email}
                                error={emailError}
                            />
                        </div>
                        <div>
                            <PasswordInput
                                handlePasswordVisibility={handlePasswordVisibility}
                                setPassword={setPassword}
                                password={password}
                                passwordType={passwordType}
                                error={passwordError}
                            />

                            <button
                                type="submit"
                                disabled={emailError || passwordError}
                                style={{ width: 200, padding: 10, margin: "1em" }}
                            >
                                Register
              </button>
                        </div>
                        {loginError && <div>{loginError}</div>}
                    </div>
                </form>
            ) : (
                    <form onSubmit={handleSubmitNew}>
                        <div>
                            <h3 style={{ textAlign: "center" }}>Register</h3>

                            <div>
                                <BasicInput
                                    title="First Name"
                                    type="text"
                                    forLabel="name"
                                    onChange={setNameLogin}
                                    value={name}
                                    error={!name}
                                />

                                <BasicInput
                                    title="Email"
                                    type="email"
                                    forLabel="email"
                                    onChange={setEmail}
                                    value={email}
                                    error={emailError}
                                />

                                <PasswordInput
                                    handlePasswordVisibility={handlePasswordVisibility}
                                    setPassword={setPassword}
                                    password={password}
                                    passwordType={passwordType}
                                    error={passwordError}
                                />

                                <button
                                    type="submit"
                                    disabled={emailError || passwordError}
                                    style={{ width: 200, padding: 10, margin: "1em" }}
                                >
                                    Register
               </button>
                            </div>
                            {loginError && <div>{loginError}</div>}
                        </div>
                    </form>
                )}

            <button
                type="button"
                onClick={handleUserTypeSwitch}
                style={{ width: 200, padding: 10 }}
            >
                {!existingUser ? "Existing Login" : "New User?"}{" "}
            </button>
        </div>
    );
};
export default LoginForm;
