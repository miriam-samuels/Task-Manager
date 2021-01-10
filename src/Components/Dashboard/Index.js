import React from 'react'
import Menubar from './Menubar'
import Boards from './Dashboard'
import User from '../Images/user.svg'

function Index() {
    return (
        <div className="dashboard">
            <Menubar/>
            <div className="personalBoard">
                <h3><img src={User} alt="pic" />Personal Boards</h3>
                <Boards/>
            </div>
            <div className="trelloBoard">
                {/* <h3><img src={User} alt="pic" />Trello Workspace</h3> */}
                {/* <Boards/> */}
            </div>
        </div>
    )
}

export default Index
