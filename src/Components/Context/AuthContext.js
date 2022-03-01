import React, { useContext, useState, useEffect } from 'react';
import { auth, provider } from '../Firebase/Firebase';


const FirebaseContext = React.createContext();

export const useAuth = () => {
    return useContext(FirebaseContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setcurrentUser] = useState()

    const createUser = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    const signInMethods = (email) => {
        return auth.fetchSignInMethodsForEmail(email);
    }
    const signInGoogleUser = () => {
        return auth.signInWithPopup(provider)
    }
    const signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }
    const signOut = () => {
        return auth.signOut();
    }
    const passwordReset = email => {
        return auth.sendPasswordResetEmail(email);
    }
    const emailUpdate = email => {
        return auth.currentUser.updateEmail(email);
    }
    const passwordUpdate = password => {
        return auth.currentUser.updatePassword(password);
    }
    const emailVerification = () => {
        return auth.currentUser.sendEmailVerification();
    }
    const generateId = () => {
        return Math.floor((1 + Math.random()) * 0x100000000000000)
            .toString(16)
            .substring(1);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                console.log(`signed in : ${user.email}`)
                setcurrentUser(user);
            }
            else {
                setcurrentUser()
            }
        })
        return unsubscribe
    }
    )
    const theme = {
        light: {
            backroundColor: "white"
        },
        dark: {
            backgroundColor: "black",
            color: "white"
        }
    }
    const value = {
        currentUser,
        theme,
        createUser,
        signIn,
        signOut,
        passwordReset,
        emailUpdate,
        passwordUpdate,
        emailVerification,
        signInGoogleUser,
        signInMethods,
        generateId,
    }
    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseContext;