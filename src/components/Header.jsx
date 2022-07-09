import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '../img/logo.png';
import avater from '../img/avatar.png'
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  // login function
  const login = async () => {
    if (!user) {
      const { user: { providerData } } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu)
    }
  };

  // logout function
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null
    });
  };

  // show cart function
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow
    });
  }

  return (
    <>
      <header className='fixed w-screen z-50 p-2 px-3 md:p-4 md:px-16 shadow-md bg-primary'>

        {/* desktop and teblet  */}
        <div className='hidden md:flex w-full h-full p-2 items-center justify-between'>
          {/* Logo */}
          <Link to={"/"} className='flex items-center gap-3 cursor-pointer'>
            <img src={Logo} alt="logo" className='w-6 md:w-12 object-cover ' />
            <p className='font-bold text-headingColor text-md md:text-xl'>BEST IN TOWN</p>
          </Link>

          {/* Nav Links */}
          <div className='flex items-center justify-center gap-8'>
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className='flex items-center gap-8'>
              <li className='navOptions' onClick={() => setIsMenu(false)}>Home</li>
              <li className='navOptions' onClick={() => setIsMenu(false)}>Menu</li>
              <li className='navOptions' onClick={() => setIsMenu(false)}>About Us</li>
              <li className='navOptions' onClick={() => setIsMenu(false)}>Services</li>
            </motion.ul>

            {/* cart icon */}
            <div className='relative flex items-center justify-center' onClick={showCart}>
              <MdShoppingBasket className='text-2xl text-textColor cursor-pointer' />
              {cartItems && cartItems.length > 0 && (
                <div className='absolute -top-3 -right-2 h-5 w-5 bg-cartNumBg rounded-full flex items-center justify-center'>
                  <p className='text-white text-sm font-semibold'>{cartItems.length}</p>
                </div>
              )}
            </div>

            {/* login */}
            <div className='relative'>
              <motion.img
                whileTap={{ scale: 0.6 }}
                src={user ? user.photoURL : avater}
                alt=""
                className='w-10 h-10 cursor-pointer rounded-full min-w-[40px] min-h-[40px] shadow-2xl'
                onClick={login}
              />
              {
                isMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className='bg-gray-50 shadow-2xl rounded-lg w-40 absolute flex flex-col top-12 right-0'>
                    {
                      user && user.email === "sumeet0604.sv@gmail.com" && (
                        <Link to={"/createItem"}>
                          <p className='dropdownItems' onClick={() => setIsMenu(false)}>New item <MdAdd /></p>
                        </Link>
                      )
                    }
                    <p className='dropdownItems' onClick={logout}>Log out <MdLogout /></p>
                  </motion.div>
                )
              }
            </div>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className='flex items-center justify-between md:hidden w-full h-full p-3'>
          <div className='relative flex items-center justify-center' onClick={showCart}>
            <MdShoppingBasket className='text-2xl text-textColor cursor-pointer' />
            {cartItems && cartItems.length > 0 && (
              <div className='absolute -top-3 -right-2 h-5 w-5 bg-cartNumBg rounded-full flex items-center justify-center'>
                <p className='text-white text-sm font-semibold'>{cartItems.length}</p>
              </div>
            )}
          </div>

          <Link to={"/"} className='flex items-center gap-3 cursor-pointer'>
            <img src={Logo} alt="logo" className='w-8 md:w-12 object-cover ' />
            <p className='font-bold text-headingColor text-md md:text-xl'>Khao</p>
          </Link>
          <div className='relative'>
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avater}
              alt=""
              className='w-10 h-10 cursor-pointer rounded-full min-w-[40px] min-h-[40px] shadow-2xl'
              onClick={login}

            />
            {
              isMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className='bg-gray-50 shadow-2xl rounded-lg w-40 absolute flex flex-col top-12 right-0'>
                  {
                    user && user.email === "sumeet0604.sv@gmail.com" && (
                      <Link to={"/createItem"}>
                        <p className='dropdownItems' onClick={() => setIsMenu(false)} >New item <MdAdd />
                        </p>
                      </Link>
                    )
                  }

                  <ul
                    className='flex flex-col' onClick={() => setIsMenu(false)}>
                    <li className='phoneNavOptions' >Home</li>
                    <li className='phoneNavOptions' >Menu</li>
                    <li className='phoneNavOptions' >About Us</li>
                    <li className='phoneNavOptions' >Services</li>
                  </ul>

                  <p className='navDropdownItems' onClick={logout}>Log out <MdLogout /></p>
                </motion.div>
              )
            }
          </div>
        </div>

      </header>
    </>
  )
}

export default Header;