import React from 'react'
import Hero from './Hero'
import Team from './Team'
import Info from './Info'
import Workflow from './Workflow'
import Plan from './Plan'
import Footer from './Footer'

function Homepage() {
    return (
        <div id="homepage">
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
        </div>
    )
}
export default Homepage
