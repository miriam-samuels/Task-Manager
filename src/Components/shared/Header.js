import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Grid from '../Images/grid.svg'
import Trello from '../Images/trello-logo-white.png'
import Bell from '../Images/bell.svg'
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/Firebase'
import { LogoWhite } from './Images'

function Header({ changeTheme, themeCheck }) {
    const [showAtlassian, setAtlassian] = useState(false);
    const [showSearchNav, setSearchNav] = useState(false);
    const [showBellicon, setBellicon] = useState(false);
    const [usericon, setusericon] = useState(false)
    const { currentUser } = useAuth()

    const toggle1 = () => setAtlassian(current => !current);
    const toggle2 = () => setSearchNav(current => !current);
    const toggle4 = () => setusericon(current => !current);
    const toggle3 = () => setBellicon(current => !current);


    return (
        <div className="nav">
            <div className="nav--first">
                <span className="icon" onClick={toggle2} ><i className="cil-search"></i></span>
                <Search showSearchNav={showSearchNav} />
            </div>
            <div className="nav--second">
                <span><Link to={`/main/${currentUser.uid}`}><img src={LogoWhite} alt="pic" /></Link></span>
            </div>
            <div className="nav--third">
                <span className="icon" onClick={toggle3}><i className="cil-bell"></i></span>
                <Bellicon showBellicon={showBellicon} />
                <span className="icon u" onClick={toggle4}><i className="cil-mood-good"></i></span>
                <Usericon usericon={usericon} />
            </div>

        </div>
    );
};
export default Header

function Atlassian({ showAtlassian, changeTheme, themeCheck }) {

    const changeMode = () => themeCheck ? { __html: 'Theme 🌚' } : { __html: 'Theme 🌞' }

    return (
        <div className="atlassian " style={{ display: showAtlassian ? 'block' : 'none' }} >
            <h5> Theme Settings</h5>
            <ul>
                {/* <li>Change Mode</li> */}
                <li onClick={() => changeTheme()} dangerouslySetInnerHTML={changeMode()}></li>
            </ul>
        </div>
    );
};
function Search({ showSearchNav }) {
    const [suggestions, setsuggestions] = useState([]);
    const [input, setinput] = useState('');
    const [datalist, setdatalist] = useState(null)
    const { currentUser } = useAuth()

    useEffect(() => { getBoardsList() }, [])

    const getBoardsList = async () => {
        await db.collection('users').doc(currentUser.uid).get().then(doc => {
            if (doc.exists) {
                setdatalist(doc.data().boards.map(data => data.title))
            }
        })
    }
    const onInputChange = (e) => {
        const val = e.target.value;
        if (val.length > 0) if (datalist) setsuggestions(datalist.sort().filter(data => data.includes(val)))
        setinput(val);
    };
    const selected = (val) => { setinput(val); setsuggestions([]); }
    const renderSuggestions = () => {
        if (suggestions.length === 0) return null;
        else return <ul> {suggestions.map((suggestion, index) => <li key={index} onClick={() => selected(suggestion)}>{suggestion}</li>)} </ul>
    };

    return (
        <div className="trelloicon " style={{ display: showSearchNav ? 'block' : 'none' }}>
            <input placeholder="Find boards by name..." value={input} onChange={onInputChange} />
            <div className="tab">
                {renderSuggestions()}
                <span>Suggestions: {suggestions.length}</span>
            </div>
            <br />
            <div className="tab">
                <b>&#9733; RECENT BOARDS</b>
                <ul>

                </ul>
            </div>
        </div>
    );
};
function Bellicon({ showBellicon }) {
    return (
        <div className="bellicon" style={{ display: showBellicon ? 'block' : 'none' }}>
            <h5>Notification</h5>
            <ul>
                <li>Coming Soon</li>
            </ul>
        </div>
    );
};
function Usericon({ usericon }) {
    const { signOut, currentUser } = useAuth()
    const history = useHistory()
    const logout = () => {
        signOut()
        history.push('/')
    }

    return (
        <div style={{ display: usericon ? 'block' : 'none' }}>
            <ul>
                <li>{currentUser.email}</li>
                <li><Link to='/emailUpdate'>Update Email</Link></li>
                <li><Link to='/passwordUpdate'>Update Password</Link></li>
                <li onClick={logout}>Log Out</li>
            </ul>
        </div>
    )
}
