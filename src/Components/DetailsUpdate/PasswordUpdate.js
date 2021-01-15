import React,{useState} from 'react'
import Logo from '../Images/trello-logo-blue.png';
import { useAuth } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';

function PasswordUpdate() {
    const [email, setemail] = useState('')
    const [error, seterror] = useState(null);
    const { passwordUpdate } = useAuth()
    const history = useHistory()
    const onChangeEmail = (e) => {
        e.preventDefault()
        setemail(e.target.value);
    }
    const updateEmail = (e) => {
        e.preventDefault()
        passwordUpdate(email)
        .then( () =>{
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
                    <input type="password" placeholder="Enter New Password" name="email" value={email} onChange={onChangeEmail} required />
                    <button type="submit" disabled={isInvalid}>Update Password</button>
                </form>
            </div>
        </div>
    )
}

export default PasswordUpdate
