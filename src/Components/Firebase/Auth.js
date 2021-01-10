
import {auth} from './firebase'

    // *** AUTH API ***
    export const createUser = (email,password) => {
        auth.createUserWithEmailAndPassword(email,password);
    }
    export const signIn = (email,password) => {
        auth.signInWithEmailAndPassword(email,password);
    }
    export const signOut = () => auth.signOut();
    export const passwordReset = email => auth.sendPasswordResetEmail(email);
    export const emailReset = email => auth.currentUser.updateEmail(email);
    export const passwordUpdate = password => auth.currentUser.updatePassword(password);


