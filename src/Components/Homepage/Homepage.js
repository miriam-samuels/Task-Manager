import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import Team from './Team'
import Info from './Info'
import Workflow from './Workflow'
import Plan from './Plan'
import Footer from './Footer'
import Theme from './Theme'
import { useAuth } from '../Context/AuthContext'
import { db } from '../Firebase/Firebase'

function Homepage() {
    const [themeCheck, setthemeCheck] = useState(false);
    const [themeSet, setthemeSet] = useState("");
    const { theme } = useAuth()
    useEffect(() => {
        db.collection('status').doc("xzCColgS8ftOetfeCKhH").get().then(doc => {
            if (doc.exists) {
                setthemeCheck(doc.data().theme)
                setthemeSet("theme gotten")
            }
        })
    }, [themeSet, themeCheck])
    const themeChange = () => {
        db.collection('status').doc("xzCColgS8ftOetfeCKhH").update({
            theme: !themeCheck
        })
        setthemeSet("theme set")
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
