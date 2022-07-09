import React, { useState, useRef } from 'react';
import { MdShoppingBasket } from "react-icons/md";
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import notFound from '../img/NotFound.svg'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';

const RowContainer = ({ flag, data, scrollValue }) => {

    const rowContainer = useRef();

    const [items, setItems] = useState([])

    const [{ cartItems }, dispatch] = useStateValue();

    const addToCart = () => {
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: items,
        });
        localStorage.setItem("cartItems", JSON.stringify(items));
    }

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue]);

    useEffect(() => {
        addToCart()
    }, [items])

    return (
        <div
            ref={rowContainer}
            className={`w-full my-12 flex items-center gap-4 
            ${flag ? "overflow-x-scroll scrollbar-none scroll-smooth" : "overflow-x-hidden flex-wrap justify-center scrollbar-none scroll-smooth"}`}>
            {/* only display items when data is available and length of data is bigger then 0 */}
            {data && data.length > 0 ? (data.map((item) => (
                <div key={item?.id} className='w-275 h-[175px] min-w-[300px] my-12 md:w-340 md:min-w-[340px] rounded-lg p-2 bg-cardOverlay backdrop-blur-3xl hover:drop-shadow-2xl flex flex-col items-center justify-between '>
                    <div className='w-full flex items-center justify-between '>
                        <motion.div
                            className='w-40 h-44 -mt-8 drop-shadow-2xl'
                            whileHover={{ scale: 1.1 }}>
                            <img
                                src={item?.imageURL}
                                alt=""
                                className='h-full w-full object-contain'
                            />
                        </motion.div>

                        {/* cart icon */}
                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'
                            onClick={() => setItems([...cartItems, item])}
                        >
                            <MdShoppingBasket className='text-white' />
                        </motion.div>
                    </div>

                    <div className='w-full flex flex-col items-end justify-end'>
                        <p className='text-textColor font-semibold text-base md:text-lg'>
                            {item?.title}
                        </p>
                        {/* <p className='text-sm mt-1 text-gray-500'>
                            {item?.calories}
                        </p> */}
                        <div className='flex items-center gap-8'>
                            <p className='text-base md:text-lg text-textColor font-semibold'>
                                <span className='text-sm text-red-500'>₹</span>{item?.price}
                            </p>
                        </div>
                    </div>
                </div>
            )))
                :
                <div className='w-full flex items-center justify-center'>
                    <img src={notFound} alt="" className='h-420' />
                    <p className='text-xl font-semibold text-textColor'>Items Not Found</p>
                </div>
            }
        </div>
    )
}

export default RowContainer