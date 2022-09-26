import React, { useContext } from 'react'
import './NavBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faStore, faBullseye, faStar } from '@fortawesome/free-solid-svg-icons'
import { signInWithGoogle } from '../../firebase-config';
import { MarkerContext } from '../../App';

export default function NavBar() {

    const { setSelectedType } = useContext(MarkerContext)

    function handleTypeChanged(e) {
        setSelectedType(e.target.value);
    };

    return (
        <nav className='nav-root'>
            <div className='left'>
                <div>
                    chuck<span className='dot'>.</span><span className='title-spot'>Spot</span>
                </div>
            </div>
            <div className='middle'>
                <div className='filter spots' onClick={handleTypeChanged} value='spot'>
                    <FontAwesomeIcon className='spot-icon' icon={faBullseye} />
                    <div>Spots</div>
                </div>
                <div className='filter parks' onClick={handleTypeChanged} value='park'>
                    <FontAwesomeIcon icon={faStar} />
                    <div>
                        Parks
                    </div>
                </div>
                <div className='filter shops' onClick={handleTypeChanged} value='shop'>
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
