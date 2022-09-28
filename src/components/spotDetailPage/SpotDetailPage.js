import React, { useContext, useEffect, useState } from 'react'
import './SpotDetailPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faStore as shopIcon, faBullseye as spotIcon, faStar as parkIcon } from '@fortawesome/free-solid-svg-icons';
import Modal from '../Modal/Modal'
import { useBoolean } from '../../hooks/UseBoolean';
import { UserContext } from '../../App';

export default function ({ handleExitClicked, name, description, location, type, images, createdBy, id, onSpotDeleted }) {

    const { activeUser } = useContext(UserContext);

    function getIcon(type) {
        let icon;
        if (type == 'spot') {
            icon = spotIcon
        } else if (type == 'park') {
            icon = parkIcon
        } else if (type == 'shop') {
            icon = shopIcon
        }
        return icon
    }

    const [isModalOpen, toggleIsModalOpen] = useBoolean(false);

    function displayModal() {
        toggleIsModalOpen(true);
    }

    return (
        <div className='spot-detail-page-root'>

            <div className='header'>
                <div className='left'>
                    <FontAwesomeIcon className='exit' icon={faArrowLeft} onClick={handleExitClicked} />
                    <h1>Spot Details</h1>
                </div>
                <div className='right'>
                    <div className='logo'>
                        chuck<span className='dot'>.</span><span className='title-spot'>Spot</span>
                    </div>

                </div>
            </div>


            <div className='detail-images-flex'>
                <div className='spot-details'>
                    <div className='name-type-flex'>
                        <h2 className='spot-name'>
                            {name}
                        </h2>
                        <div className='spot-type'>
                            <div className={type}>
                                <FontAwesomeIcon icon={getIcon(`${type}`)} />

                            </div>
                        </div>
                    </div>
                    <p className='spot-description'>
                        {description}
                    </p>

                    <div className='spot-location-parent'>
                        <h3>Location:</h3>
                        <div className='spot-coordinates'>
                            <div className='spot-lat'>
                                <h4>Latitude:</h4>
                                <div>
                                    {location[0]}
                                </div>
                            </div>

                            <div className='spot-long'>
                                <h4>Longitude:</h4>
                                <div>
                                    {location[1]}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='image-container'>
                    <div className='image'>
                        {images}
                    </div>
                </div>
            </div>

            {activeUser?.uid == createdBy &&
                <div className='buttons'>
                    <button className='delete' onClick={displayModal}>Delete</button>

                    <button className='edit'>Edit</button>
                </div>}

            {isModalOpen && (
                < Modal
                    isModalOpen={isModalOpen}
                    toggleIsModalOpen={toggleIsModalOpen}
                    id={id}
                    onSpotDeleted={onSpotDeleted}
                />
            )}
        </div>
    )
}
