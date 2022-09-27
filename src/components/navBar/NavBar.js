import React from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faStore, faBullseye, faStar } from '@fortawesome/free-solid-svg-icons'
import { signInWithGoogle } from '../../firebase-config';


export default function NavBar({ setTypeFilter }) {


    function handleTypeChanged(type) {
        setTypeFilter(type);
    };

    return (
        <nav className='nav-root'>
            <div className='left'>
                <div>
                    chuck<span className='dot'>.</span><span className='title-spot'>Spot</span>
                </div>
            </div>
            <div className='middle'>
                <div className='filter spots'
                    onClick={() => { handleTypeChanged('spot') }}
                    value='spot'>
                    <FontAwesomeIcon className='spot-icon' icon={faBullseye} />
                    <div>Spots</div>
                </div>
                <div className='filter parks'
                    onClick={() => { handleTypeChanged('park') }}
                    value='park'>
                    <FontAwesomeIcon icon={faStar} />
                    <div>
                        Parks
                    </div>
                </div>
                <div className='filter shops'
                    onClick={() => { handleTypeChanged('shop') }}
                    value='shop'>
                    <FontAwesomeIcon icon={faStore} />
                    <div>Shops</div>
                </div>
            </div>
            <div className='right'>
                <div className="login" onClick={signInWithGoogle}>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </div>
            </div>
        </nav>
    )
}
