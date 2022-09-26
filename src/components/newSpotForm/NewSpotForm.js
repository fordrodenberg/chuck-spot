import React, { useEffect, useState } from 'react'
import './NewSpotForm.css'
import { collection, addDoc } from 'firebase/firestore'
import { getStorage } from "firebase/storage"
import { ref, uploadBytes } from 'firebase/storage';
import { db } from "../../firebase-config";
import { v4 } from 'uuid';

export default function NewSpotForm({ position, handleCancelClicked, onSubmit }) {

    const storage = getStorage();
    const markersCollectionRef = collection(db, "markers");

    const [images, setImages] = useState([]);
    const imageUrls = images?.map(img => URL.createObjectURL(img)); // derived from images

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        location: [position.lat, position.lng],
        type: 'spot',
        imageIds: [] // do not add to this via the form. only add during upload
    });

    function clearForm() {
        setImages([])
        setFormData({
            name: '',
            description: '',
            location: [position.lat, position.lng],
            type: 'spot',
            imageIds: [] // do not add to this via the form. only add during upload
        })
    }

    function handleInputChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function submitSpot() {


        // then upload the doc
        let spotDoc = await addDoc(markersCollectionRef, formData)
        console.log(spotDoc.id);

        // upload images and get "URLs" / ids for the images
        for (let i = 0; i < images.length; i++) {
            let id = formData.imageIds[i]
            uploadImage(images[i], id, spotDoc.id);
        }

        onSubmit && onSubmit();
        clearForm();
    }

    function uploadImage(img, imageId, spotId) {

        const imageRef = ref(storage, `images/${spotId}/${imageId}`);
        uploadBytes(imageRef, img)
            .then((snapshot) => {
                // .then has to be here to actually make the promise resolve

                // getDownloadURL(snapshot.ref)
                //     .then((url) => {
                //         console.log(url)
                //         // setImageUrls((prev) => [...prev, url])
                //     });
            });
    }

    function handleImageUploadChange(e) {
        let newId = v4();
        setImages([...images, e.target.files[0]])
        setFormData((formData) => {
            return {
                ...formData,
                imageIds: [...formData.imageIds, newId]
            }
        });
    }

    // Displays uploaded image on newSpotForm
    useEffect(() => {
        // listAll(imagesListRef).then((response) => {
        //     response.items.forEach((item) => {
        //         getDownloadURL(item).then((url) => {
        //             setImageUrls((prev) => [...prev, url]);
        //         });
        //     });
        // });
    }, []);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            submitSpot();
        }}>
            <div className='new-spot-form-root'>
                <h1>Create a spot</h1>

                {/* name */}
                <div className='spot-name'>
                    <label htmlFor='name'>
                        Spot Name:
                    </label>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder='Addlestone Double Set'
                        id='name'
                    />
                </div>

                {/* description */}
                <div>
                    <label htmlFor='description'>
                        Description:
                    </label>
                    <textarea
                        type='text'
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange}
                        required

                        placeholder='6 stair with handrail, gap, ledges, etc'
                        id='name'
                    />
                </div>

                {/* lat, long */}
                <label className='location'>Location:</label>
                <div className='location-root'>
                    <div className='lat-input'>
                        <label htmlFor='latitude'>Latitude:</label>
                        <input
                            type='number'
                            value={formData.location[0]}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    location: [e.target.value, formData.location[1]]
                                })
                            }}
                            required
                            id='spotLatitude' />
                    </div>
                    <div className='long-input'>
                        <label htmlFor='longitude'>Longitude:</label>
                        <input
                            type='number' value={formData.location[1]}
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    location: [formData.location[0], e.target.value]
                                })
                            }}
                            required
                            id='spotLongitude' />
                    </div>
                </div>

                {/* type radio group */}
                <div className='type-root'>
                    <legend htmlFor='spotType' className='type-label'>Type:</legend>
                    <div className='spot-type-container'>
                        <div>
                            <input

                                id="typeSpotOption"
                                type='radio'
                                name='type'
                                value='spot'
                                checked={formData.type === 'spot'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor='typeSpotOption'>Spot</label>
                        </div>

                        <div>
                            <input

                                id="typeParkOption"
                                type='radio'
                                name='type'
                                value='park'
                                checked={formData.type === 'park'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor='typeParkOption'>Park</label>
                        </div>

                        <div>
                            <input
                                id="typeShopOption"
                                type='radio'
                                name='type'
                                value='shop'
                                checked={formData.type === 'shop'}
                                onChange={handleInputChange}
                            />
                            <label htmlFor='typeShopOption'>Shop</label>
                        </div>
                    </div>


                </div>

                {/* image upload */}
                <div>
                    <input type='file' multiple
                        onChange={handleImageUploadChange} />
                    <br />
                    {imageUrls.map((url) => {
                        return <img width='75px' height='75px' src={url} />;
                    })}
                </div>

                {/* cancel and submit buttons */}
                <div className='buttons'>
                    <button onClick={handleCancelClicked} className='cancel'>Cancel</button>

                    <button className='submit' type='submit'>Submit</button>
                </div>
            </div>
        </form >
    )
}



// images/:spotId/:imageId