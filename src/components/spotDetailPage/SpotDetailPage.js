import React from 'react'
import './SpotDetailPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark as solidX } from '@fortawesome/free-solid-svg-icons';




export default function ({ handleExitClicked, name, description, location, type }) {

    return (
        <div className='spot-detail-page-root'>

            <h1>Spot Details</h1>

            <FontAwesomeIcon className='exit' icon={solidX} onClick={handleExitClicked} />

            <div className='spot-details'>
                <h2>
                    {name}
                </h2>

                <p>
                    {description}
                </p>

                <div>
                    <h2>Location</h2>
                    <div>
                        <h3>Latitude</h3>
                        <div>
                            {location[0]}
                        </div>
                    </div>

                    <div>
                        <h3>Longitude</h3>
                        <div>
                            {location[1]}
                        </div>
                    </div>

                    <div>
                        {type}
                    </div>
                </div>
            </div>


        </div>
    )
}
