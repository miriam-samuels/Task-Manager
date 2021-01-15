import React from 'react'
import Logo from '../Images/trello-logo-white.png'
import Herobg from '../Images/hero.svg'
import { Link } from 'react-router-dom'

function Hero() {
    return (
        <div>
            <div id="menubar">
                <span className="logo"><img src={Logo} alt="pic" /></span>
                <span><Link to="/login"><button>Log In</button></Link></span>
                <span className="sign"><Link to="/login"><button>Sign Up</button></Link></span>
            </div>
            <div className="hero">
                <div className="heroWords">
                    <h1>We helps teams work more collaboratively and get more done.</h1>
                    <p>It’s boards, lists, and cards enable teams to organize and prioritize projects in a fun, flexible, and rewarding way.</p>
                    <Link to="/login"><button>Sign Up It's Free</button></Link>
                </div>
                <div className="heroImg">
                    <img src={Herobg} alt="pic" />
                </div>
            </div>
        </div>
    )
}

export default Hero
