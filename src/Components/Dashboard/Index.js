import React from 'react'
import Menubar from './Menubar'
import Boards from './Dashboard'
import User from '../Images/user.svg'

function Index({changeTheme}) {
    return (
        <div className="dashboard" >
            <Menubar changeTheme={changeTheme}/>
            <div className="personalBoard">
                <h3><img src={User} alt="pic" />    Personal Boards</h3>
                <Boards/>
            </div>
        </div>
    )
}

export default Index
