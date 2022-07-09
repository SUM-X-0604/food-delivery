import React, { useEffect, useState } from 'react';
import { IoFastFood } from 'react-icons/io5';
import { categories } from '../utils/Data';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import RowContainer from './RowContainer';

const MenuContainer = () => {

    const [filter, setFilter] = useState("chicken");

    const [{ foodItems }] = useStateValue();

    useEffect(() => { }, [filter]);

    return (
        <section className='w-full my-16' id='menu'>
            <div className='w-full flex flex-col items-center justify-between'>
                <p className='text-2xl capitalize text-headingColor font-semibold relative before:absolute before:content before:rounded-lg before:left-0 before:w-40 before:h-1 before:-bottom-2 bg-gradient-to-r from-orange-400 before:to-orange-600 transition-all ease-in-out duration-100 mr-auto'>
                    our hot dishes
                </p>

                <div className='w-full flex items-center justify-start md:justify-center gap-8 py-6 overflow-x-auto scrollbar-none'>
                    {categories && categories.map(category => (
                        <motion.div
                            whileHover={{ scale: 1.20 }}
                            key={category.id}
                            className={
                                `group 
                                    ${filter === category.urlParamName ? 'bg-cartNumBg ' : 'bg-card'}
                                hover:bg-cartNumBg w-24 min-w-[94px] h-28 mt-10 rounded-lg drop-shadow-xl flex flex-col items-center justify-center gap-3 cursor-pointer `}
                            onClick={
                                () => setFilter(category.urlParamName)
                            }>

                            <div
                                className={`w-10 h-10 
                                ${filter === category.urlParamName ?
                                        "bg-card" : "bg-cartNumBg"}  
                                        rounded-full group-hover:bg-card flex items-center justify-center`}>

                                <IoFastFood
                                    className={`${filter === category.urlParamName ?
                                        'text-textColor' : "text-card"}  
                                        group-hover:text-textColor text-lg`}
                                />
                            </div>

                            <p
                                className={`${filter === category.urlParamName ?
                                    "text-white" : "text-textColor"}
                                     text-sm text-textColor group-hover:text-white`}>
                                {category.name}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div>
                    <RowContainer
                        flag={false}
                        data={foodItems?.filter(data => data.category === filter)} />
                </div>

            </div>
        </section >
    )
}

export default MenuContainer
