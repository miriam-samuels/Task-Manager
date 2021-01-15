import React from 'react'
import Herobg from '../Images/hero.svg'
import { Link } from 'react-router-dom'

function Team() {
    return (
        <div>
            <div className="team">
                <div className="teamWords">
                    <h1>Work with any team</h1>
                    <p>Whether it’s for work, a side project or even the next family vacation, Trello helps your team stay organized.</p>
                    <Link to="/login"><button>Start Doing</button></Link>
                </div>
                <div className="teamImg">
                    <img src={Herobg} alt="pic" />
                </div>
            </div>
        </div>
    )
}

export default Team
