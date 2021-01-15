import React from 'react'
import Bot from '../Images/bot.png'
function Workflow() {
    return (
        <div>
            <div className="workflow">
                <div className="flowWords">
                    <h1>Built-In Workflow Automation With Butler</h1>
                    <p>Let the robots do the work! Boost productivity by unleashing the power of automation across your entire team with Butler, and remove tedious tasks from your to-do lists with:</p>
                    {/* <ul>
                        <li>Rule-Based Triggers</li>
                        <li>Custom Card & Board Buttons</li>
                        <li>Calendar Commands</li>
                        <li>Due Date Commands</li>
                    </ul> */}
                </div>
                <div className="flowImg">
                    <img src={Bot} alt="pic" />
                </div>
            </div>
        </div>
    )
}

export default Workflow
