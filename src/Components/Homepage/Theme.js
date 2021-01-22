import React from 'react'

function Theme({ themeChange, themeCheck }) {
    const themeStyles = {
        position: "fixed",
        bottom: "10%",
        right: "5%",
        border: "none",
        background: "transparent"
    }

    const changeMode = () => themeCheck ? { __html: '🌞' } : { __html: '🌚' }
    return (
        <>
            <button onClick={themeChange} style={themeStyles} dangerouslySetInnerHTML={changeMode()} className="themebtn"></button>
        </>
    )
}

export default Theme
