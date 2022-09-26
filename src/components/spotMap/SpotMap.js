import React, { useContext, useEffect, useState } from 'react'

import { TileLayer } from 'react-leaflet';
import { MarkerContext } from '../../App';
import AddSpotPopup from '../addSpotPopup/AddSpotPopup';
import CurrentLocationPin from '../currentLocationPin/CurrentLocationPin';
import SpotMarker from '../markers/SpotMarker';

export default function SpotMap({ markers, getMarkers }) {

    const [filteredList, setFilteredList] = useState(markers);
    const { selectedType } = useContext(MarkerContext)

    function filterByType(filteredData) {
        if (!selectedType) {
            return filteredData;
        }
        const filteredMarkers = filteredData.filter(
            (marker) => marker.type === selectedType
        );
        return filteredMarkers;
    }

    useEffect(() => {
        var filteredData = filterByType(markers);
        setFilteredList(filteredData);
    }, [selectedType])


    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {filteredList.map((marker) =>
                <SpotMarker key={marker.id} {...marker} />
            )}
            <CurrentLocationPin />
            <AddSpotPopup onNewSpotAdded={getMarkers} />
            {/* doesn't show until map is clicked */}

        </>
    )
}
