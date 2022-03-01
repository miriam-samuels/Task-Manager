import React, { useState } from 'react'
import Logo from '../Images/mitareas logo.png';
import { useAuth } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

function EmailUpdate() {
    const [email, setemail] = useState('')
    const [error, seterror] = useState(null);
    const { emailUpdate } = useAuth()
    const history = useHistory()
    const onChangeEmail = (e) => {
        e.preventDefault()
        setemail(e.target.value);
    }
    const updateEmail = (e) => {
        e.preventDefault()
        emailUpdate(email)
            .then(() => {
                history.push('/')
                seterror(null)
            })
            .catch(error => {
                seterror(error)
            })
    }
    const isInvalid = email === '';
    return (
        <div id="page1">
            <div id="login">
                <img src={Logo} alt="logo" />
                <form className="login" onSubmit={updateEmail}>
                    {error && <p>{error.code}</p>}
                    <input type="email" placeholder="Enter Email" name="email" value={email} onChange={onChangeEmail} required />
                    <button type="submit" disabled={isInvalid}>Update Email</button>
                </form>
            </div>
        </div>
    )
}

export default EmailUpdate
