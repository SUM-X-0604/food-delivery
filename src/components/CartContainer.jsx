import React, { useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';
import emptyCart from '../img/emptyCart.svg'
import CartItems from './CartItems';
import { useEffect } from 'react';

const CartContainer = () => {

    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    // show cart function
    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        });
    };

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qnt * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot);
    }, [tot, flag, cartItems]);

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: []
        });

        localStorage.setItem("cartItems", JSON.stringify([]));
    };

    let subTotal = tot;
    let delivery = tot * 8 / 100;
    let gst = tot / 100 * 18;

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className='fixed top-4 right-0 h-screen bg-white w-full md:w-375 drop-shadow-md flex flex-col z-[101]'>

            <div className='w-full flex items-center justify-between p-4'>
                <motion.div
                    whileTap={{ scale: 0.9 }}
                    onClick={showCart}
                >
                    <MdOutlineKeyboardBackspace
                        className='text-textColor text-3xl cursor-pointer'
                    />
                </motion.div>

                <p className='text-textColor text-lg font-semibold cursor-pointer'>
                    Cart
                </p>

                <motion.p
                    whileTap={{ scale: 0.9 }}
                    className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md text-textColor text-base cursor-pointer'
                    onClick={clearCart}
                >
                    Clear
                    <RiRefreshFill />
                </motion.p>
            </div>

            {/* bottom section */}
            {cartItems && cartItems.length > 0 ? (
                <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
                    {/* cart section start */}
                    <div className='w-full h-340 md:h-42 flex flex-col px-6 py-10 gap-3 scrollbar-none overflow-y-scroll '>
                        {/* cart items */}
                        {cartItems && cartItems.length > 0 && cartItems.map((item) => (
                            // cart item component
                            <CartItems
                                key={item.id}
                                item={item}
                                setFlag={setFlag}
                                flag={flag}
                            />
                        ))}
                    </div>
                    {/* cart section end*/}

                    {/* cart total section start*/}
                    <div className='w-full flex flex-col items-center justify-evenly flex-1 rounded-t-[2rem] bg-cartTotal px-8 py-2'>
                        {/* sub total */}
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-400 text-lg'>Sub Total</p>
                            <p className='text-gray-400 text-lg'>₹ {Math.trunc(subTotal)}</p>
                        </div>

                        {/* delivery */}
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-400 text-lg'>Delivery</p>
                            <p className='text-gray-400 text-lg'>₹ {Math.trunc(delivery)}</p>
                        </div>

                        {/* gst */}
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-400 text-lg'>GST(18%)</p>
                            <p className='text-gray-400 text-lg'>₹ {Math.trunc(gst)}</p>
                        </div>

                        <div className='w-full border-b border-gray-600 bottom-2'></div>

                        {/* total */}
                        <div className='w-full flex items-center justify-between'>
                            <p className='text-gray-200 text-xl font-semibold'>Total</p>
                            <p className='text-gray-200 text-xl font-semibold'>₹ {Math.floor(subTotal + delivery + gst)}</p>
                        </div>

                        {user ? (
                            <motion.button
                                whileTap={{ scale: 0.75 }}
                                type="button"
                                className='w-full rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 p-2 my-2 text-lg font-semibold text-gray-50 hover:shadow-lg'>
                                Check Out
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.75 }}
                                type="button"
                                className='w-full rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 p-2 my-2 text-lg font-semibold text-gray-50 hover:shadow-lg'>
                                Login to check Out
                            </motion.button>
                        )}
                    </div>
                    {/* cart total section end*/}
                </div>
            ) : (
                <div className='w-full h-full flex flex-col items-center justify-center gap6'>
                    <img src={emptyCart} alt="" className='w-300' />
                    <p className='text-xl text-textColor font-semibold pt-4'>
                        Add Items to your cart
                    </p>
                </div>
            )}
        </motion.div>
    )
}

export default CartContainer