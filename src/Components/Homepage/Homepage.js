import React, { useState } from 'react'
import Hero from './Hero'
import Team from './Team'
import Info from './Info'
import Workflow from './Workflow'
import Plan from './Plan'
import Footer from './Footer'
import Theme from './Theme'
import { useAuth } from '../Context/AuthContext'

const homeTheme = localStorage.getItem("theme") || false
function Homepage() {
    const [themeCheck, setthemeCheck] = useState(homeTheme);
    const { theme } = useAuth()
    localStorage.setItem("theme", themeCheck)
    const themeChange = () => {
        setthemeCheck(current => !current)
    }

    return (
        <div id="homepage" style={themeCheck ? theme.light : theme.dark}>
            <section id="hero">
                <Hero />
            </section>
            <section id="team">
                <Team />
            </section>
            <section id="info">
                <Info />
            </section>
            <section id="workflow">
                <Workflow />
            </section>
            <section id="plan">
                <Plan />
            </section>
            <section id="footer">
                <Footer />
            </section>
            <Theme themeChange={themeChange} themeCheck={themeCheck} />
        </div>
    )
}
export default Homepage
