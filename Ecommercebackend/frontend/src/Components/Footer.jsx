import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='bg-gray-800 px-4 md:px-16 lg:px-28'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div>
                    <h2 className='text-lg font-bold mb-4 text-white'>
                        About
                    </h2>
                    <p className='text-gray-300'>
                        WE are a team dedicated to providing the best producs and services to our customer.
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-bold mb-4 text-white'>
                        Quick Links
                    </h2>
                    <ul className='text-white'>
                        <li><a href="#" className='hover:underline text-gray-300'>Home</a></li>
                        <li><a href="#" className='hover:underline text-gray-300'>About</a></li>
                        <li><a href="#" className='hover:underline text-gray-300'>Process</a></li>
                        <li><a href="#" className='hover:underline text-gray-300'>Contact</a></li>

                    </ul>
                </div>
                <div>
                    <h2 className='text-lg font-bold mb-4 text-white'>
                        Follow Us
                    </h2>
                    <ul className='text-white'>
                        <li className="flex items-center gap-2 ">
                            <FaFacebook className="text-blue-500 text-xl" />
                            <a href="#" className="hover:underline text-gray-300">Facebook</a>
                        </li>

                        <li className="flex items-center gap-2">
                            <FaInstagram className="text-pink-500 text-xl" />
                            <a href="#" className="hover:underline text-gray-300">Instagram</a>
                        </li>

                        <li className="flex items-center gap-2">
                            <IoLogoGithub className="text-gray-200 text-xl" />
                            <a href="#" className="hover:underline text-gray-300">Github</a>
                        </li>

                        <li className="flex items-center gap-2">
                            <FaYoutube className="text-red-600 text-xl" />
                            <a href="#" className="hover:underline text-gray-300">Youtube</a>
                        </li>

                    </ul>
                </div>
            </div>
            <div className='border-t border-gray-600 p-4 text-gray-300 text-center mt-6'>
                <p className="text-center text-gray-300 text-sm tracking-wide">
                    © 2025 <span className="text-orange-500 font-bold">Code with Madhav</span> —
                    Empowering Your Web Journey ✨
                </p>

            </div>
        </footer>

    )
}

export default Footer
