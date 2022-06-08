import React from 'react';
import Logo from './img/logo.png'

const Header = () => {
  return (
    <>
      <header className='fixed w-screen p-6 z-50 px-16'>
        
        {/* desktop and teblet  */}
        <div className='hidden md:flex w-full h-full p-4'>
          <div className='flex items-center gap-3 cursor-pointer'>
            <img src={Logo} alt="logo" className='w-10 object-cover ' />  
            <p className='font-bold text-headingColor text-xl'>Khao</p>
          </div>

          <ul className='flex items-center gap-8 ml-auto'>
            <li className='navOptions'>Home</li>
            <li className='navOptions'>Menu</li>
            <li className='navOptions'>About Us</li>
            <li className='navOptions'>Services</li>
          </ul>
        </div>

        {/* phone */}
        <div className='flex md:hidden w-full h-full p-4'>

        </div>

      </header>
    </>
  )
}

export default Header;