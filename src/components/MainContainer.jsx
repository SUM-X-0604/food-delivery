import React, { useEffect, useState } from 'react';
import HomeConainer from './HomeConainer';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {
    const [{ foodItems, cartShow }] = useStateValue();
    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => { }, [scrollValue, cartShow])

    return (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
            <HomeConainer />

            {/* foodItem section */}
            <section className='w-full my-16'>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-2xl capitalize text-headingColor font-semibold relative before:absolute before:content before:rounded-lg before:left-0 before:w-40 before:h-1 before:-bottom-2 bg-gradient-to-r from-orange-400 before:to-orange-600 transition-all ease-in-out duration-100'>
                        our fresh & healthy food
                    </p>

                    <div className='hidden md:flex gap-3 items-center'>
                        <motion.div whileTap={{ scale: 0.75 }} className='h-8 w-8 rounded-lg bg-orange-400 hover:bg-orange-600 cursor-pointer flex items-center justify-center hover:shadow-lg'>
                            <MdChevronLeft className='text-lg text-white' onClick={() => setScrollValue(-250)} />
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.75 }} className='h-8 w-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer flex items-center justify-center hover:shadow-lg'>
                            <MdChevronRight className='text-lg text-white' onClick={() => setScrollValue(250)} />
                        </motion.div>
                    </div>
                </div >

                <RowContainer
                    scrollValue={scrollValue}
                    flag={true}
                    data={foodItems?.filter((item) => item.category === "fruits")}
                />

            </section >

            {/* Menu section */}
            <MenuContainer />

            {/* cart section */}
            {cartShow && (
                <CartContainer />
            )}
        </div >
    )
}

export default MainContainer