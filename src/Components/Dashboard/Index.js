import React, { useEffect, useState } from 'react'
import Menubar from './Menubar'
import Boards from './Dashboard'
import User from '../Images/user.svg'
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/Firebase';


function Index() {
    const [themeCheck, setthemeCheck] = useState(false);
    const [themeSet, setthemeSet] = useState("")
    const { theme, currentUser } = useAuth()
    useEffect(() => {
        const status = db.collection('users').doc(currentUser.uid).get().then(doc => {
            setthemeCheck(doc.data().theme)
            setthemeSet("theme gotten")
        })
        return status
    }, [themeSet,currentUser.uid])

    const changeTheme = () => {
        db.collection('users').doc(currentUser.uid).update({
            theme: !themeCheck
        })
        setthemeSet("theme set")
    }
    return (
        <div className="dashboard" style={themeCheck ? theme.light : theme.dark}>
            <Menubar changeTheme={changeTheme} />
            <div className="personalBoard">
                <h3><img src={User} alt="pic" />    Personal Boards</h3>
                <Boards />
            </div>
        </div>
    )
}

export default Index
