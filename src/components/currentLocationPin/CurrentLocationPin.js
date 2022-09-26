import React, { useContext, useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import { MapContext } from '../../App';

export default function CurrentLocationPin() {

    const { usersCurrentPosition, disableMap } = useContext(MapContext);


    return usersCurrentPosition === null ? null : (
        <Marker position={usersCurrentPosition} eventHandlers={{
            click: (e) => {
                disableMap()
            }
        }}>
            <Popup>You are here</Popup>
        </Marker>
    )
}