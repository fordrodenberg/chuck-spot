import React, { useContext, useRef } from 'react'
import { useMapEvents } from 'react-leaflet';
import { MapContext } from '../../App'
import './SideMenu.css'

export default function SideMenu({ children }) {
    const { disableMap, isSideMenuOpen } = useContext(MapContext);
    const backgroundRef = useRef()

    if (isSideMenuOpen) {
        disableMap();
    }
    return (
        <div className={`side-menu-root ${isSideMenuOpen ? 'visible' : 'hidden'}`}
            ref={backgroundRef}
        >
            <div className="side-menu">
                {children}
            </div>
        </div>
    )
}
