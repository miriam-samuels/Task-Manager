import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import * as ROUTE from '../Routes/Routes'
const activatedStyle = {
    color: '#22c222'
}
function Sidebar() {
    const { currentUser } = useAuth()
    

    return (
        <div>
            <div>
                <ul className="sidebar--items">
                    <li className="sidebar__item"><NavLink to={`/main/${currentUser.uid}`} activeStyle={activatedStyle}><i className='cil-speedometer'></i> <b>Dashboard</b></NavLink></li>
                    <li className="sidebar__item"><NavLink to={`/projects/${currentUser.uid}`} activeStyle={activatedStyle}><i className='cil-folder-open'></i> <b>Projects</b></NavLink></li>
                    <li className="sidebar__item"><NavLink to={`/teams/${currentUser.uid}`} activeStyle={activatedStyle}><i className='cil-people'></i> <b>Teams</b> </NavLink></li>
                    <li className="sidebar__item"><NavLink to={`/personal/${currentUser.uid}`} activeStyle={activatedStyle}><i className='cil-user'></i> <b>Personal boards</b></NavLink></li>
                    <li className="sidebar__item"><NavLink to={`/business/${currentUser.uid}`} activeStyle={activatedStyle}><i className='cil-folder'></i> <b>Business boards</b> </NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
