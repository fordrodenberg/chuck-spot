import React, { useContext, useRef } from 'react'
import { MapContext } from '../../App'
import './modal.css'

export default function Modal({ isOpen }) {



    return (
        <div className={`modal-root ${isOpen ? 'visible' : 'hidden'}`}>

        </div>
    )
}
