import React from 'react'
import { Link } from 'react-router-dom'
function Plan() {
    return (
        <div>
            <div className="plan">
                <div className="planWords">
                    <h1>Start Planning Today</h1>
                    <p>Sign up and join over 1,000,000 teams worldwide who are using Trello to get more done.</p>
                    <Link to="/login"><button>Get Started - It's Free</button></Link>
                </div>

            </div>
        </div>
    )
}

export default Plan
