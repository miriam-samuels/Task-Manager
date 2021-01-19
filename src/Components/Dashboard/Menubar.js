import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Grid from '../Images/grid.svg'
import Trello from '../Images/trello-logo-white.png'
import Search from '../Images/magnifiying-glass.svg'
import Bell from '../Images/bell.svg'
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/Firebase'


function Menubar({ changeTheme,themeCheck }) {
    const [showAtlassian, setAtlassian] = useState(false);
    const [showTrelloicon, setTrelloicon] = useState(false);
    const [showBellicon, setBellicon] = useState(false);
    const [usericon, setusericon] = useState(false)
    const { currentUser } = useAuth()

    const toggle1 = () => setAtlassian(current => !current);
    const toggle2 = () => setTrelloicon(current => !current);
    const toggle4 = () => setusericon(current => !current);
    const toggle3 = () => setBellicon(current => !current);

    return (
        <div id="menubar">
            <div className="first">
                <span className="icon" onClick={toggle1} ><img src={Grid} alt="pic" /></span>
                <span className="icon" onClick={toggle2}><img src={Search} alt="pic" /></span>
                <Atlassian showAtlassian={showAtlassian} changeTheme={changeTheme} themeCheck={themeCheck}/>
                <Trelloicon showTrelloicon={showTrelloicon} /></div>
            <div className="second">
                <span><Link to={`/dashboard/${currentUser.uid}`}><img src={Trello} alt="pic" /></Link></span>
            </div>
            <div className="third">
                <span className="icon" onClick={toggle3}><img src={Bell} alt="pic" /></span>
                <span className="icon u" onClick={toggle4} >{currentUser.email.slice(0, 1)}</span>
                <Bellicon showBellicon={showBellicon} />
                <Usericon usericon={usericon} />
            </div>

        </div>
    );
};
export default Menubar

function Atlassian({ showAtlassian, changeTheme,themeCheck }) {

    const changeMode = () => themeCheck ? {__html: 'Theme 🌞'} : {__html:'Theme 🌚'}

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
function Trelloicon({ showTrelloicon }) {

    const [suggestions, setsuggestions] = useState([]);
    const [input, setinput] = useState('');
    const { currentUser } = useAuth()
    let Data;

    db.collection('users').doc(currentUser.uid).get().then(doc => {
        if (doc.exists) {
            Data = doc.data().boards.map(data => data.title)
        }
    })

    const onInputChange = (e) => {
        const val = e.target.value;
        let suggestions = [];
        if (val.length > 0) {
            const regexp = new RegExp(`^${val}`, 'i');
            if (Data) {
                suggestions = Data.sort().filter(data => regexp.test(data));
            }
        };

        setsuggestions(suggestions);
        setinput(val);
    };
    const renderSuggestions = () => {
        if (suggestions.length === 0) return null;
        return (
            <ul>
                {
                    suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => { selected(suggestion) }}>{suggestion}</li>
                    ))
                }
            </ul>
        );
    };
    const selected = (val) => {
        setinput(val);
        setsuggestions([]);
    }
    return (
        <div className="trelloicon " style={{ display: showTrelloicon ? 'block' : 'none' }}>
            <input placeholder="Find boards by name..." onChange={onInputChange} />
            <div className="tab">
                {renderSuggestions()}
                <span>Suggestions: {suggestions.length}</span>
            </div>
            <br />
            <div className="tab">
                <b>&#9733; STARRED BOARDS</b>
                <ul>

                </ul>
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
