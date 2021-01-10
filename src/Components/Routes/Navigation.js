import React from 'react'
import {Link} from 'react-router-dom'
import * as ROUTES from './Routes'
const Navigation = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to={ROUTES.LANDING}>Sign In</Link>
                </li>
                <li>
                    <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                </li>
                <li>
                    <Link to={ROUTES.WORKSPACE}>Workspace</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation
