import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Logo from '../Images/trello-logo-blue.png';
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/Firebase';
const Login = () => {
    return (
        <div>
            <LoginForm />
        </div>
    )
}
function LoginForm() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState(null);
    const [hasAcct, sethasAcct] = useState(false);
    const history = useHistory()
    const { createUser, signIn, currentUser, signInGoogleUser } = useAuth()

    useEffect(() => {
        if (currentUser) {
            history.push(`/dashboard/${currentUser.uid}`)
        }
    })

    const onChangeEmail = (e) => {
        e.preventDefault()
        setemail(e.target.value)
    }
    const onChangePassword = (e) => {
        e.preventDefault()
        setpassword(e.target.value)
    }
    const handleLogin = (e) => {
        e.preventDefault();

        signIn(email, password)
            .then(() => {
                seterror(null)
            })
            .catch(error => {
                seterror(error)
            })
    }
    const handleSignup = (e) => {
        e.preventDefault()
        createUser(email, password)
            .then(user => {
                seterror(null)
                db.collection('users').doc(user.user.uid).set({
                    boards:[]
                })                
            })
            .catch(error => {
                seterror(error)
            })
    }
    const googleSignIn = () => {
        signInGoogleUser()
            .then(user => {
                db.collection('users').doc(user.user.uid).set({
                    boards: []
                })
                seterror(null)
                // var credential = result.credential;
                // var token = credential.accessToken;
                // var user = result.user;
            })
            .catch((error) => {
                seterror(error)
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // var email = error.email;
                // var credential = error.credential;
                // ...
            });

    }

    const isInvalid = email === '' || password === '';


    return (
        <div id="page1">
            <div id="login">
                <img src={Logo} alt="logo" />
                <form className="login">
                    {error && <p>{error.code}</p>}
                    <input type="email" placeholder="Enter Email" name="email" value={email} onChange={onChangeEmail} required />
                    <input type="password" placeholder="Enter Password" name="password" value={password} onChange={onChangePassword} required />
                    {
                        hasAcct ?
                            <>
                                <Link to='/reset'><span>Forgot Password ?</span></Link>
                                <button type="submit" disabled={isInvalid} onClick={handleLogin}>Login</button>
                                <div>
                                    <span>Can't login?</span>
                                    <span onClick={() => sethasAcct(!hasAcct)}>Sign Up</span>
                                </div>
                            </> :
                            <>
                                <button type="submit" disabled={isInvalid} onClick={handleSignup}>Sign up</button>
                                <div>
                                    <span>Have an account?</span>
                                    <span onClick={() => sethasAcct(!hasAcct)}>Log In</span>
                                </div>
                            </>

                    }
                    <p>OR</p>
                    <button type="button" className="others" onClick={googleSignIn}>Continue with Google</button>
                </form>

                <div>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>
        </div>
    )
}
export default React.memo(Login)
