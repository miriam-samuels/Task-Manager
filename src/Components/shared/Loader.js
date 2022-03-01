import React, { useState } from 'react'

function Loader(props) {
    const loaderStyle = {
        display: props.isLoading ? 'block' : 'none',
        width:'100%',
        position:'absolute',
        top:'50%',
        right:'50%',
        transform:'translate(50%,-50%)'
    }

    return (
        <div className="text-center" style={loaderStyle}>
        <div className="spinner-grow" role="status"style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
    )
}

export default Loader
