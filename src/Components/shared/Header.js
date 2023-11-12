import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Grid from '../Images/grid.svg'
import Trello from '../Images/trello-logo-white.png'
import Bell from '../Images/bell.svg'
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/Firebase'
import { LogoWhite } from './Images'

function Header() {
    const { currentUser, getTheme } = useAuth()
    useEffect(() => {
        const subscribe = getTheme();
        return subscribe;
    }, [])
    return (
        <div className="nav">
            <div className="nav--first">
                <div className="icon">
                    <span><i className="cil-search"></i></span>
                    <Search />
                </div>
            </div>
            <div className="nav--second">
                <span><Link to={`/main/${currentUser.uid}`}><img src={LogoWhite} alt="pic" /></Link></span>
            </div>
            <div className="nav--third">
                <div className="icon u">
                    <span><i className="cil-mood-good"></i></span>
                    <Usericon />
                </div>
            </div>

        </div>
    );
};
export default Header

function Search() {
    const [suggestions, setsuggestions] = useState([]);
    const [input, setinput] = useState('');
    const [datalist, setdatalist] = useState(null)
    const { currentUser } = useAuth()
    const history = useHistory()

    useEffect(() => { getBoardsList() }, [])

    const getBoardsList = async () => {
        await db.collection('users').doc(currentUser.uid).get().then(doc => {
            if (doc.exists) {
                setdatalist(doc.data().boards)
            }
        })
    }
    const onInputChange = (e) => {
        const val = e.target.value;
        if (val.length > 0) if (datalist) setsuggestions(datalist.sort().filter(data => data.title.toLowerCase().includes(val.toLowerCase())))
        setinput(val);
    };
    const selected = (val) => { setinput(val.title); setsuggestions([]); history.push(`/workspace/${val.id}`) }
    const renderSuggestions = () => {
        if (suggestions.length === 0) return null;
        else return <ul> {suggestions.map((suggestion, index) => <li key={index} onClick={() => selected(suggestion)}>{suggestion.title}</li>)} </ul>
    };

    return (
        <div className="trelloicon header-nav" >
            <div className="tab-con">
                <input placeholder="Find boards by name..." value={input} onChange={onInputChange} />
                <div className="tab">
                    {renderSuggestions()}
                </div>
            </div>
        </div>
    );
};
function Usericon() {
    const { signOut, currentUser, changeTheme, themeCheck } = useAuth()
    const history = useHistory()
    const logout = () => {
        signOut();
        history.push('/');
    }
    const changeMode = () => themeCheck ? { __html: 'Theme 🌚' } : { __html: 'Theme 🌞' }

    return (
        <div className="user header-nav">
            <ul>
                <li>{currentUser.email}</li>
                <li onClick={() => changeTheme()} dangerouslySetInnerHTML={changeMode()}></li>
                <li><Link to='/emailUpdate'>Update Email</Link></li>
                <li><Link to='/passwordUpdate'>Update Password</Link></li>
                <li onClick={logout}>Log Out</li>
            </ul>
        </div>
    )
}
