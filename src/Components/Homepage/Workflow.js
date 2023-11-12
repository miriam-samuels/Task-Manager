import React from 'react'
import Bot from '../Images/bot.png'
import Feature1 from '../Images/features-icon-1.png'
import Feature2 from '../Images/features-icon-2.png'
import Feature3 from '../Images/features-icon-3.png'

function Workflow() {
    return (
        <div>
            <div className="workflow">
                {/* <div className="flowList"> */}
                    <figure>
                        <h1>01</h1>
                        <img src={Feature1} alt="feature" />
                        <figcaption>
                            <h2> Custom Card & Board Buttons</h2>
                        </figcaption>
                    </figure>
                    <figure>
                        <h1>02</h1>
                        <img src={Feature2} alt="feature" />
                        <figcaption>
                            <h2>Task Optimization & Efficiency</h2>
                        </figcaption>
                    </figure>
                    <figure>
                        <h1>03</h1>
                        <img src={Feature3} alt="feature" />
                        <figcaption>
                            <h2>Calendar & Due Date Commands</h2>
                        </figcaption>
                    </figure>
                    {/* <h1>Built-In Workflow Automation With Butler</h1> */}
                    {/* <p>Let the robots do the work! Boost productivity by unleashing the power of automation across your entire team with Butler, and remove tedious tasks from your to-do lists with:</p> */}
                    <ul>
                        {/* <li>Rule-Based Triggers</li> */}
                    </ul>
                {/* </div> */}
                {/* <div className="flowImg">
                     <img src={Bot} alt="pic" /> 
                </div> */}
            </div>
        </div>
    )
}

export default Workflow
