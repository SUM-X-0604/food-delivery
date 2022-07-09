import React from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';
import { fetchCart } from '../utils/FetchLoacalStorageData'
import { useEffect } from 'react';

let items = []

const CartItems = ({ item, setFlag, flag }) => {

    const [{ cartItems }, dispatch] = useStateValue();
    const [qnt, setQnt] = useState(item.qnt);


    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: items,
        });
    };

    const updateQnt = (action, id) => {
        if (action === "add") {
            setQnt(qnt + 1);
            cartItems.map((item) => {
                if (item.id === id) {
                    item.qnt += 1;
                    setFlag(flag + 1)
                }
            });
            cartDispatch();
        } else {
            if (qnt === 1) {
                items = cartItems.filter((item) => item.id !== id);
                setFlag(flag + 1)
                cartDispatch();
            } else {
                setQnt(qnt - 1);
                cartItems.map((item) => {
                    if (item.id === id) {
                        item.qnt -= 1;
                        setFlag(flag + 1)
                    }
                });
                cartDispatch();
            }
        }
    };

    useEffect(() => {
        items = cartItems;
    }, [qnt])

    return (
        <d iv className='w-full rounded-lg bg-cartItem px-2 py-1 gap-1 flex items-center'>
            <img
                src={item?.imageURL}
                alt=""
                className='w-20 h-20 md:h-[60px] object-contain rounded-full' />

            {/* Name section */}
            <div className='flex flex-col gap-2'>
                <p className='text-base text-gray-50'>{item?.title}</p>
                <p className='text-sm block text-gray-300 font-semibold'>₹{parseFloat(item?.price) * qnt}</p>
            </div>

            {/* button section */}
            <div className='group flex items-center ml-auto cursor-pointer gap-2'>
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQnt("remove", item?.id)}>
                    <BiMinus className='text-gray-50' />
                </motion.div>

                <p className='w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>
                    {qnt}
                </p>

                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQnt("add", item?.id)}>
                    <BiPlus className='text-gray-50' />
                </motion.div>
            </div>
        </d>
    )
}

export default CartItems