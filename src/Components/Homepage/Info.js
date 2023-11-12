import React from 'react'
import Phone from '../Images/banner-img1.png'

function Info() {
    return (
        <div>
            <div className="hinfo">
                <div className="infoImg">
                    <img src={Phone} alt="pic" />
                </div>
                <div className="infoWords">
                    <h1>Information at a glance</h1>
                    <hr/>
                    <p>Dive into the details by adding comments, attachments, due dates, and more directly to your cards. Collaborate on projects from beginning to end.</p>
                </div>

            </div>
        </div>
    )
}

export default Info
