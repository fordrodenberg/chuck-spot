import React from 'react'
import { TileLayer } from 'react-leaflet';
import AddSpotPopup from '../addSpotPopup/AddSpotPopup';
import CurrentLocationPin from '../currentLocationPin/CurrentLocationPin';
import SpotMarker from '../spotMarker/SpotMarker';
import MAP_THEMES from '../../assets/leafletStyles.json'
import './SpotMap.css'
export default function SpotMap({ markers, selectedType, getMarkers }) {


    const filteredMarkers = filterByType();

    function filterByType() {
        return markers.filter(m => !selectedType || selectedType == m.type);
    }

    return (
        <div className='map-container'>
            <TileLayer
                attribution={MAP_THEMES[0].attribution}
                url={MAP_THEMES[0].url}
            />

            {filteredMarkers.map((marker) =>
                <SpotMarker
                    key={marker.id}
                    onSpotDeleted={getMarkers}
                    onSpotEdited={getMarkers}
                    {...marker} />
            )}
            <CurrentLocationPin />
            <AddSpotPopup onNewSpotAdded={getMarkers} />
            {/* doesn't show until map is clicked */}

        </div>
    )
}


