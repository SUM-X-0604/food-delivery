import React from 'react'
import delivery from '../img/delivery.png'
import heroBg from '../img/heroBg.png'
import { homeData } from '../utils/Data'
import HomeCardContainer from './HomeCardContainer'

const HomeConainer = () => {
    return (

        <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
            {/* left element */}
            <div className='py-2 flex flex-col items-center justify-center flex-1 md:items-start gap-4'>
                <div className='flex items-center justify-center gap-1 bg-orange-100 rounded-full px-4 py-2'>
                    <p className='text-base font-semibold text-orange-500'>Bike Delivery</p>
                    <div className='w-8 h-8 rounded-full bg-white overflow-hidden drop-shadow-xl'>
                        <img
                            src={delivery}
                            alt="delivery"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
                <p className='text-[2.5rem] font-bold tracking-wide text-headingColor text-center md:text-left md:text-[3rem] lg:text-[4rem]'>
                    The Fastest Delivery in
                    <span className='text-[3rem] text-orange-600 md:text-[3.5rem] lg:text-[4.5rem]'> Your City</span>
                </p>
                <div className='md:w-[80%]'>
                    <p className='text-base text-textColor text-center md:text-left'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore eligendi distinctio error doloremque odio, ducimus soluta aut quis in accusamus quidem! Ipsam enim commodi amet qui, delectus sed beatae officiis sapiente soluta.
                    </p>
                </div>
                <button
                    type='button'
                    className='text-center bg-gradient-to-br from-orange-400 to-orange-500 w-full sm:w-auto px-4 py-2 hover:shadow-lg transition-all duration-100 ease-in-out font-semibold text-white rounded-lg'>
                    Order Now
                </button>
            </div>

            {/* right element */}
            <div className='py-2 flex items-center relative'>
                <img
                    src={heroBg}
                    alt=""
                    className='ml-auto h-[420px] w-full lg:h-[600px] lg:w-auto'
                />
                <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 lg:px-32 gap-4 flex-wrap drop-shadow-xl'>
                    {homeData && homeData.map((data) => (
                        <HomeCardContainer key={data.id} name={data.name} img={data.image} desc={data.desc} price={data.price} />
                    )
                    )}
                </div>
            </div>
        </section>
    )
}

export default HomeConainer