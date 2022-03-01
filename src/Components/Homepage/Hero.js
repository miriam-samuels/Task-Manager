import React from 'react'
// import Logo from '../Images/mimi'
import Herobg from '../Images/banner-img1.png'
import { Link } from 'react-router-dom'

function Hero() {
    const spanRight = {
        position : "absolute",
        right : "2%"
    }
    return (
        <div>
            <div className="menubar">
                <span className="spanLeft">
                    {/* <span className="logo"><img src={Logo} alt="pic" /></span> */}
                </span>
                <span className="spanRight" style={spanRight}>
                    <span><Link to="/login"><button>Log In</button></Link></span>
                    <span className="sign"><Link to="/login"><button>Sign Up</button></Link></span>
                </span>
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
