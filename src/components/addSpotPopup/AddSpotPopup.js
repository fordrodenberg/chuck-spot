import React, { useContext, useState } from 'react'
import { Popup, useMapEvents } from 'react-leaflet'
import { MapContext } from '../../App';
import { useBoolean } from '../../hooks/UseBoolean';
import NewSpotForm from '../newSpotForm/NewSpotForm';
import SideMenu from '../sideMenu/SideMenu';
import './AddSpotPopup.css'

export default function AddSpotPopup({ onNewSpotAdded }) {
    console.log('add spot popup')

    const [position, setPosition] = useState(null);
    const { isMapDisabled, disableMap, enableMap, isSideMenuOpen, toggleIsSideMenuOpen } = useContext(MapContext);

    const map = useMapEvents({
        click(e) {

            if (isMapDisabled && !isSideMenuOpen) {
                enableMap();
                return
            }

            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
            disableMap();
        },
        locationfound(e) {
        },
    });

    function handleAddSpotClicked() {
        toggleIsSideMenuOpen();

    }
    function handleCancelClicked() {
        toggleIsSideMenuOpen();

    }

    if (position === null) {
        return null
    } else {
        return (
            <>
                <Popup position={position}>
                    <button onClick={handleAddSpotClicked}> + New Spot</button>
                </Popup>

                <SideMenu isOpen={isSideMenuOpen} toggleSideMenuOpen={toggleIsSideMenuOpen}>
                    <NewSpotForm
                        onSubmit={() => {
                            toggleIsSideMenuOpen();
                            onNewSpotAdded && onNewSpotAdded()
                        }}
                        handleCancelClicked={handleCancelClicked}
                        position={position} />
                </SideMenu>

            </>
        )
    }
}