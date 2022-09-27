import './App.css';
import { MapContainer } from 'react-leaflet/MapContainer'
import React, { createContext, useEffect, useState } from 'react';
import NavBar from './components/navBar/NavBar';
import { db } from "./firebase-config"
import { collection, getDocs } from 'firebase/firestore'
import SpotMap from './components/spotMap/SpotMap';
import LoadingScreen from './components/loadingScreen/LoadingScreen';
import { useBoolean } from './hooks/UseBoolean';
import { map } from 'leaflet';
import L from 'leaflet'

export const MapContext = createContext(null);
export const MarkerContext = createContext(null);


function App() {

  const [markers, setMarkers] = useState([]);
  const markersCollectionRef = collection(db, "markers");
  const [usersCurrentPosition, setUsersCurrentPosition] = useState(null);
  const [isMapDisabled, setIsMapDisabled] = useState(false);
  const [selectedType, setSelectedType] = useState("");



  function disableMap() {
    setIsMapDisabled(true);
  }

  function enableMap() {
    setIsMapDisabled(false);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setUsersCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    });
  }, [])

  useEffect(() => {
    getMarkers();
  }, []);

  async function getMarkers() {
    const data = await getDocs(markersCollectionRef)

    setMarkers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  return (
    <MapContext.Provider value={{ isMapDisabled, disableMap, enableMap, usersCurrentPosition }}>
      <MarkerContext.Provider value={{ selectedType, setSelectedType }}>
        <div className='app-root'>
          <div className='map-container'>
            {usersCurrentPosition
              ? <MapContainer
                center={[usersCurrentPosition?.lat, usersCurrentPosition?.lng]}
                zoom={13}
                scrollWheelZoom={false}>
                <SpotMap
                  markers={markers}
                  selectedType={selectedType}
                  getMarkers={getMarkers}
                />
              </MapContainer>
              : <LoadingScreen />}
            <NavBar
              selectedType={selectedType}
              setTypeFilter={(typeSelected) => {
                setSelectedType(typeSelected)
              }}
            />
          </div>
        </div>
      </MarkerContext.Provider>
    </MapContext.Provider>
  )
}

export default App;
