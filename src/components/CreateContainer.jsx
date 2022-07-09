/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { categories } from '../utils/Data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/FirebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';

const CreateContainer = () => {

    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [fileds, setFields] = useState(false);
    const [alrteStatus, setAlertStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [{ foodItems }, dispatch] = useStateValue();

    // upload image function
    const uploadImage = (e) => {
        setIsLoading(true);
        const ImageFile = e.target.files[0]
        const storageRef = ref(storage, `Images/${Date.now()}-${ImageFile.name}`)

        const uploadTask = uploadBytesResumable(storageRef, ImageFile);

        uploadTask.on('state_changed',
            (snapshot) => {
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (error) => {
                console.log(error);
                setFields(true);
                setMsg("error white uploading. Try again 🤷‍♂️😥");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false)
                    setIsLoading(false)
                }, 4000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);
                    setIsLoading(false);
                    setFields(true);
                    setAlertStatus("succsess")
                    setTimeout(() => {
                        setFields(false)
                    }, 4000);
                });
                setMsg("Image Uploaded Succesfully 😊💪");
            });
    };

    // delete image function
    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg("Image Deleted Successfully 😊")
            setAlertStatus("success");
            setTimeout(() => {
                setFields(false);
            }, 4000);
        });
    };

    // save details function
    const saveDetails = () => {
        setIsLoading(true);

        try {
            if ((!title || !imageAsset || !price || !category || !calories)) {
                setFields(true);
                setMsg("Input value Can't be empty 🤷‍♂️");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false)
                    setIsLoading(false)
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    calories: calories,
                    qnt: 1,
                    price: price,

                }
                saveItem(data);
                setIsLoading(false);
                setFields(true);
                setMsg("Data Uploaded Successfully 😊")
                setAlertStatus("success");
                clearData();
                setTimeout(() => {
                    setFields(false);
                }, 4000);
            }

        } catch (error) {
            console.log(error);
            setFields(true);
            setMsg("error white uploading. Try again 🤷‍♂️😥");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000);
        }

        fetchData();
    };

    const clearData = () => {
        setTitle("");
        setImageAsset(null);
        setCalories("");
        setPrice("");
        setCategory("Select Category");
    }

    // fetchig all the food items
    const fetchData = async () => {
        await getAllFoodItems().then(data => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            });
        });
    };

    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='w-[90%] md:w-[75%] border  rounded-lg p-4 border-gray-300 flex flex-col items-center justify-center gap-4'>
                {fileds && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full p-2 rounded-lg text-center 
                            ${alrteStatus === "danger"
                                ? "bg-red-400 text-red-800"
                                : "bg-emerald-400 text-emerald-800"}`
                        }>
                        {msg}
                    </motion.p>
                )}

                {/* Search field */}
                <div className='w-full flex items-center py-2 border-b border-gray-300 gap-2'>
                    <MdFastfood className='text-xl text-gray-700' />
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Give me a title...'
                        className='w-full h-full bg-transparent outline-none text-lg   border-none placeholder:text-gray-400 text-textColor'
                    />
                </div>
                {/* Search field end*/}

                {/* select category field */}
                <div className='w-full'>
                    <select
                        onChange={
                            (e) => setCategory(e.target.value)}
                        className="text-base outline-none w-full p-2 border-b-2 cursor-pointer rounded-lg border-gray-400"
                    >
                        <option
                            value="other"
                            className='bg-white '
                        >
                            Select Category
                        </option>
                        {categories && categories.map((item) => (
                            <option
                                key={item.id}
                                className="border-0 outline-none text-base text-headingColor capitalize"
                                value={item.urlParamName}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* select category field end*/}

                {/* image loaded section start */}
                <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-800 cursor-pointer w-full h-225 md:h-460'>
                    {isLoading
                        ?
                        (
                            <Loader />
                        )
                        :
                        (
                            <>
                                {!imageAsset
                                    ?
                                    (
                                        <>
                                            <label className='h-full w-full flex flex-col items-center justify-center cursor-pointer'>
                                                <div className='h-full w-full flex flex-col items-center justify-center'>
                                                    <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                                                    <p className='text-gray-700 '>
                                                        Click here to upload
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    name='uploadImage'
                                                    accept='image/*'
                                                    className='w-0 h-0'
                                                    onChange={uploadImage} />
                                            </label>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <div className='relative h-full'>
                                                <img src={imageAsset} alt="" className='h-full w-full object-cover'
                                                />
                                                <button
                                                    type='button'
                                                    className='absolute bottom-3 right-3 rounded-full p-2 text-xl outline-none bg-red-500 cursor-pointer hover:shadow-md transition-all duration-500 ease-in-out'
                                                    onClick={deleteImage}
                                                > <MdDelete className='text-white' /> </button>
                                            </div>
                                        </>
                                    )
                                }
                            </>
                        )
                    }

                </div>
                {/* image loaded section end */}

                {/* calorie section start */}
                <div className='h-full w-full flex flex-col md:flex-row items-center gap-3'>

                    {/* food court */}
                    <div className='w-full p-2 border-b border-gray-300 flex items-center gap-2'>
                        <MdFoodBank className='text-2xl text-gray-700' />
                        <input
                            type="text"
                            required
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)} placeholder="Calories"
                            className='w-full h-full bg-transparent outline-none text-lg   border-none placeholder:text-gray-400 text-textColor'
                        />
                    </div>

                    {/* price */}
                    <div className='w-full p-2 border-b border-gray-300 flex items-center gap-2'>
                        <MdAttachMoney className='text-2xl text-gray-700' />
                        <input
                            type="text"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} placeholder="Price"
                            className='w-full h-full bg-transparent outline-none text-lg   border-none placeholder:text-gray-400 text-textColor'
                        />
                    </div>
                </div>
                {/* calorie section end */}

                {/* save button start */}

                <div className='flex items-center w-full'>
                    <button className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 p-2 rounded-lg text-lg text-white font-semibold'
                        onClick={saveDetails}
                    >
                        Save
                    </button>
                </div>
                {/* save button end */}
            </div>
        </div>
    )
}

export default CreateContainer;