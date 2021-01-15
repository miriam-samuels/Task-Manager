import React from 'react'
import Logo from '../Images/trello-logo-white.png'

function Footer() {
    return (
        <>
            <div>
                <select>
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Spanish (ES)</option>
                </select>
            </div>
            <div>
                <ul>
                    <li>Templates</li>
                    <li>Pricing</li>
                    <li>Jobs</li>
                    <li>Blogs</li>
                    <li>Developers</li>
                    <li>About</li>
                    <li>Help</li>
                    <li>Legal</li>
                </ul>
            </div>
            <div>
                <img src={Logo} alt="pic" />
            </div>
            <div>
                <p>© Copyright 2021. All rights reserved.</p>
            </div>
        </>
    )
}

export default Footer
