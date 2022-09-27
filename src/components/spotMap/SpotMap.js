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
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
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


