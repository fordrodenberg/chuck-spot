import React, { useRef } from 'react'
import './modal.css'

export default function Modal({ children, toggleModalOpen }) {

    const backgroundRef = useRef()

    function handleBGClicked(e) {
        if (e.target == backgroundRef.current) {
            toggleModalOpen()
        }
    }

    return (
        <div className="modal-root" ref={backgroundRef} onClick={handleBGClicked}>
            <div className="modal">

                {children}
            </div>
        </div>
    )
}
