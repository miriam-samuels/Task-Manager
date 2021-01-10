import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../Firebase/Firebase';


const FirebaseContext = React.createContext();

export const useAuth = () => {
    return useContext(FirebaseContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setcurrentUser] = useState( )

    const createUser = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
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
    const value = {
        currentUser,
        createUser,
        signIn,
        signOut,
        passwordReset,
    }
    return (
        <FirebaseContext.Provider value={value}>
            {children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseContext;