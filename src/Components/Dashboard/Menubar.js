import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Grid from '../Images/grid.svg'
import Trello from '../Images/trello.svg'
import Search from '../Images/magnifiying-glass.svg'
import Logo from '../Images/trello-logo-white.svg'
import Plus from '../Images/plus.svg'
import Bell from '../Images/bell.svg'
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/Firebase'


function Menubar() {
    const [showAtlassian, setAtlassian] = useState(false);
    const [showTrelloicon, setTrelloicon] = useState(false);
    const [showPlusicon, setPlusicon] = useState(false);
    const [showBellicon, setBellicon] = useState(false);
    const [usericon, setusericon] = useState(false)
    const { currentUser } = useAuth()

    const toggle1 = () => setAtlassian(current => !current);
    const toggle2 = () => setTrelloicon(current => !current);
    const toggle3 = () => setPlusicon(current => !current);
    const toggle4 = () => setBellicon(current => !current);
    const toggle5 = () => setusericon(current => !current);

    return (
        <div id="menubar">
            <div className="first">
                <span className="icon" onClick={toggle1} ><img src={Grid} alt="pic" /></span>
                <span className="icon" onClick={toggle2}><img src={Trello} alt="pic" /></span>
                <span className="icon"><img src={Search} alt="pic" /></span>
                <Atlassian showAtlassian={showAtlassian} />
                <Trelloicon showTrelloicon={showTrelloicon} /></div>
            <div className="second">
                <span><Link to={`/dashboard/${currentUser.uid}`}><img src={Logo} alt="pic" /></Link></span>
            </div>
            <div className="third">
                <span className="icon" onClick={toggle3}><img src={Plus} alt="pic" /></span>
                <span className="icon" onClick={toggle4}><img src={Bell} alt="pic" /></span>
                <span  onClick={toggle5}><img src="" alt="pic" /></span>
                <Plusicon showPlusicon={showPlusicon} />
                <Bellicon showBellicon={showBellicon} />
                <Usericon usericon = {usericon} />
            </div>

        </div>
    );
};
export default Menubar

function Atlassian({ showAtlassian }) {
    return (
        <div className="atlassian " style={{ display: showAtlassian ? 'block' : 'none' }} >
            <h5> Theme Settings</h5>
            <ul>
                <li>Change Mode</li>
                <li>Choose Theme Color</li>
            </ul>
        </div>
    );
};
function Trelloicon({ showTrelloicon }) {

    const [suggestions, setsuggestions] = useState([]);
    const [input, setinput] = useState('');
    let Data;

        db.collection('boards').get().then((snapshot) => {
             Data =  snapshot.docs.map(doc => {
                    return doc.data().title
                })
        })

    const onInputChange = (e) => {
        const val = e.target.value;
        let suggestions = [];
        if (val.length > 0) {
            const regexp = new RegExp(`^${val}`, 'i');
            suggestions = Data.sort().filter(data => regexp.test(data));
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
function Plusicon({ showPlusicon }) {
    return (
        <div className="plusicon " style={{ display: showPlusicon ? 'block' : 'none' }}>
            <h5>Create</h5>
            <ul>
                <li>Create boards</li>
                <li>Start with a template</li>
                <li>Create team</li>
                <li>Create business team</li>
            </ul>
        </div>
    );
};
function Bellicon({ showBellicon }) {
    return (
        <div className="bellicon" style={{ display: showBellicon ? 'block' : 'none' }}>
            <h5>Notification</h5>
        </div>
    );
};
function Usericon({usericon}) {
    const { signOut,currentUser } = useAuth()
    const history = useHistory()
    const logout = () => {
        history.push('/')
        signOut()
    }
    

    return(
        <div style={{ display: usericon ? 'block' : 'none' }}>
            <ul>
                <li>{currentUser.email}</li>
                <li>Update Email</li>
                <li>Update Password</li>
                <li onClick={logout}>Log Out</li>
            </ul>
        </div>
    )
}
