import React from 'react'

const HomeCardContainer = ({ name, img, desc, price }) => {
    return (
        <div className='lg:w-190 p-2 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center'>
            <img
                src={img}
                alt=""
                className='w-20 lg:w-40 -mt-10 lg:-mt-20' />
            <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>
                {name}
            </p>
            <p className='text-[12px] lg:text-sm lg:text-md font-semibold text-lighttextGray my-1 lg:my-3'>
                {desc}
            </p>
            <p className='text-sm lg:text-md font-semibold text-headingColor'>
                <span className='text-xs text-red-600'>₹</span> {price}</p>
        </div>
    )
}

export default HomeCardContainer