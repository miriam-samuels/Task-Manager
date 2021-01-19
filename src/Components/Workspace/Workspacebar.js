import React from 'react'

function Workspacebar({ title, visibility, timestamp }) {
    return (
        <div id="workspacebar">
            <div className="buttons">
                <button>Board</button>
                <button>{title}</button>
                <button>&#9733;</button>
                <button>{timestamp}</button>
                <button>{visibility}</button>
                <button>Invite</button>
                <button>Butler</button>
                <button>... Show Menu</button>
            </div>
            <div className="content">

            </div>
        </div>
    )
}

export default Workspacebar
