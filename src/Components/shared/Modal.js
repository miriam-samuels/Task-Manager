import React, { useState } from 'react'

function Modal(props) {
    return (
        <div className="modal-con" style={props.styles}>
            {props.children}
            <div className="overlay"></div>
        </div>
    )
}

export default Modal
