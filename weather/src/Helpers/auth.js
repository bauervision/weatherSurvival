import firebase from "../config";


export const SignUserOut = () => {
    firebase.auth().signOut()
        .then(() => {
            return true;
        })
        .catch((error) => {
            return [false, error];
        });
};

export const RegisterUser = async (email, password) => {
    try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (user) {
            return user;
        }
    } catch (error) {
        const status = { error, successful: false };
        return status;
    }
};

export const LoginUserEmailPassword = async (email, password) => {
    try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        return user;
    } catch (err) {
        const status = { error: err, successful: false };
        return status;
    }
};
