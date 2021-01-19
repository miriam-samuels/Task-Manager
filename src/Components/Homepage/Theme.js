import React from 'react'

function Theme({ themeChange, themeCheck }) {
    const themeStyles = {
        position: "fixed",
        bottom: "10%",
        right: "5%",
        fontSize: "70px",
        border: "none",
        background: "transparent"
    }

    const changeMode = () => themeCheck ? { __html: '🌞' } : { __html: '🌚' }
    return (
        <>
            <button onClick={themeChange} style={themeStyles} dangerouslySetInnerHTML={changeMode()}></button>
        </>
    )
}

export default Theme
