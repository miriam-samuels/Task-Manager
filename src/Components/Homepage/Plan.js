import React from 'react'
import { Link } from 'react-router-dom'
import Decor from '../Images/right-bg-decor.png'
function Plan() {
    return (
        <div>
            <img src={Decor} alt ="decor" />

            <div className="plan">
                <div className="planWords">
                    <h1>Start Planning Today</h1>
                    <hr/>
                    <p>Sign up and join over 1,000,000 teams worldwide who are using Trello to get more done.</p>
                    <Link to="/login"><button>Get Started - It's Free</button></Link>
                </div>

            </div>
        </div>
    )
}

export default Plan
