import React from 'react'
import HomeConainer from './HomeConainer';
import { motion } from 'framer-motion';


const MainContainer = () => {
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
                        <motion.div whileTap={{ scale: 0.75 }} className='h-8 w-8 rounded-lg bg-orange-400 hover:bg-orange-600 cursor-pointer transition-all ease-in-out duration-100 flex items-center hover:shadow-lg'></motion.div>
                        <motion.div whileTap={{ scale: 0.75 }} className='h-8 w-8 rounded-lg bg-orange-400 hover:bg-orange-500 cursor-pointer transition-all ease-in-out duration-100 flex items-center hover:shadow-lg'></motion.div>
                    </div>

                </div >

            </section >
        </div >
    )
}

export default MainContainer