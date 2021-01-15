import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Logo from '../Images/trello-logo-blue.png';
// import firebase from 'firebase/app';
import { useAuth } from '../Context/AuthContext';
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
    const { createUser, signIn, currentUser } = useAuth()

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
            .then(authUser => {
                console.log(authUser);
                seterror(null)
                history.push(`/dashboard/${authUser.uid}`)
            })
            .catch(error => {
                seterror(error)
            })
    }
    const handleSignup = (e) => {
        e.preventDefault()

        createUser(email, password)
            .then(authUser => {
                seterror(null)
                // firebase.firestore().collection('accounts').doc(authUser.uid).set(authUser);
                history.push(`/dashboard/${authUser.uid}`)
            })
            .catch(error => {
                seterror(error)
            })
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
                    {/* <p>OR</p>
                    <button type="button">Continue with Google</button>
                    <button type="button">Continue with Microsoft</button>
                    <button type="button">Continue with Apple</button>
                    <p>Log in wih SSO</p> */}
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
