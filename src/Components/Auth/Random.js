// import React, { useState, useEffect } from 'react'
// import Firebase from './firebase';
// import Login from '../Auth/Login';
// import Menubar from '../Dashboard/Menubar';
// import Dashboard from '../Dashboard/Index';


// function Auth() {
//     const [user, setuser] = useState('')
//     const [email, setemail] = useState('');
//     const [password, setpassword] = useState('');
//     const [error, seterror] = useState('');

//     const clrInput = () => {
//         setemail("")
//         setpassword("")
//     }
//     const clrError = () => {
//         seterror("")
//     }
//     const handlelogin = (e) => {
//         Firebase
//             .auth()
//             .signInWithEmailAndPassword(email, password)
//             .then((user) => {
//                 console.log(user)
//               })
//               .catch((error) => {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 switch (errorCode) {
//                     case "auth/invalid-email":
//                     case "auth/user-not-found":
//                     case "auth/wrong-password":
//                         seterror(errorMessage)
//                         break;
//                     default : seterror("")
//                         break;
//                 }
//               });
//         e.preventDefault();
//     }
//     const handlesignup = (e) => {
//         clrError()
//         Firebase
//             .auth()
//             .createUserWithEmailAndPassword(email, password)
//             .then((user) => {
//                 console.log(user)
//               })
//               .catch((error) => {
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 switch (errorCode) {
//                     case "auth/email-already-in-use":
//                     case "auth/weak-password":
//                         seterror(errorMessage)
//                         break;
//                     default : seterror("")
//                         break;
                    
//                 }
//               })
//         e.preventDefault();
//     }
//     const handlelogout = () => {
//         Firebase.auth().signOut();
//     }

//     //check if user exists
//     const authListener = () => {
//         Firebase.auth().onAuthStateChanged(user => {
//             if (user) {
//                 clrInput()
//                 setuser(user);
//             }
//             else {
//                 setuser('')
//             }
//         })
//     }

//     useEffect(() => {
//         authListener();
//     })
//     const emailchange = (e) => {
//         setemail(e.target.value);
//     }
//     const passwordchange = (e) => {
//         setpassword(e.target.value);
//     }
//     const isInvalid = password === '' || email === '';

//     if (user) {
//         return(
//             <>
//             <Dashboard />
//             </>
//         )
//     }
//     else {
//         return (
//             <>
//                 <Login
//                     email={email}
//                     emailchange={emailchange}
//                     password={password}
//                     passwordchange={passwordchange}
//                     isInvalid={isInvalid}
//                     handlesignup={handlesignup}
//                     handlelogin={handlelogin}
//                     error={error}
//                 />
//                 <div style={{ display: "none" }}>
//                     <Menubar handlelogout={handlelogout} />
//                 </div>
//             </>
//         )
//     }

// }

// export default Auth
