import React, { useEffect } from 'react'
import Hero from './Hero'
import Team from './Team'
import Info from './Info'
import Workflow from './Workflow'
import { useAuth } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom'
import Plan from './Plan'

function Homepage() {
    const { currentUser } = useAuth()
    const history = useHistory()
    useEffect(() => {
        if (currentUser) {
            // history.push(`/dashboard/${currentUser.uid}`)
        }
    })
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
        </div>
    )
}
export default Homepage
