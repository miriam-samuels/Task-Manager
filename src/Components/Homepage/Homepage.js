import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import Logo from '../Images/mitareas logo.png'

const homeTheme = localStorage.getItem("theme") || true
function Homepage() {
    const [themeCheck, setthemeCheck] = useState(homeTheme);
    const { theme } = useAuth()
    localStorage.setItem("theme", themeCheck)

    const themeChange = () => {
        setthemeCheck(current => !current)
    }

    return (
        <div id="homepage" style={themeCheck ? theme.light : theme.dark}>
            <div className="z-40 top-5 left-10 absolute ">
                {/* <h1>M</h1> */}
            </div>
            <nav className=" z-40 top-50 left-10 absolute">
                <a href="#1"> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                </a><br />
                <a href="#2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </a><br />
                <a href="#3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </a><br />
                <a href="#4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                </a>
            </nav>
            <div className="slides">
                <div className="slide hero-bg" id="1">
                    <div>
                        <img src={Logo} alt="" />
                    </div>
                </div>
                <div className="slide" id="2">

                </div>
                <div className="slide" id="3">

                </div>

                <div className="slide" id="4">

                </div>
            </div>
        </div>


    )
}
export default Homepage
