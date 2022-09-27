import React from 'react'
import { TileLayer } from 'react-leaflet';
import AddSpotPopup from '../addSpotPopup/AddSpotPopup';
import CurrentLocationPin from '../currentLocationPin/CurrentLocationPin';
import SpotMarker from '../markers/SpotMarker';

export default function SpotMap({ markers, selectedType, getMarkers }) {


    const filteredMarkers = filterByType();

    function filterByType() {
        return markers.filter(m => selectedType == "" || selectedType == m.type);
    }

    return (
        <>

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredMarkers.map((marker) =>
                <SpotMarker key={marker.id} {...marker} />
            )}
            <CurrentLocationPin />
            <AddSpotPopup onNewSpotAdded={getMarkers} />
            {/* doesn't show until map is clicked */}

        </>
    )
}
