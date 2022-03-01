import React, { useState } from 'react'

function Modal(props) {
    const [toggleModal, settoggleModal] = useState(false)
    const [toggleId,settoggleId] = ('')
    const modalStyle = {
        display: toggleModal ? 'block' : 'none',
    }
    
    const toggleStateChange = () => settoggleId(props.toggleId); toggleId === props.toggleId ? settoggleModal(current => !current) : settoggleModal(false)
    window.addEventListener('click', () => { if (toggleModal) settoggleModal(false) })
    // console.log(props.componentRef.current)
    return (
        <div className="modal-con" style={modalStyle}>
            <props.child toggle={toggleStateChange} id={props.toggleId} />
        </div>
    )
}

export default Modal
