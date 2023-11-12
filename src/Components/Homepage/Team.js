import React from 'react'
import Herobg from '../Images/about-bg.png'
import Tablet from '../Images/tablet-img.png'
import { Link } from 'react-router-dom'

function Team() {
    return (
        <div>
            <div className="team">
                <div className="teamImg">
                    <img src={Herobg} alt="pic" className="pillar" />
                    <img src={Tablet} alt="pic" />
                </div>
                <div className="teamWords">
                    <h1>Work with any team</h1>
                    <hr/>
                    <p>Whether it’s for work, a side project or even the next family vacation, We help your team stay organized.</p>
                    <Link to="/login"><button>Start Doing</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Team
