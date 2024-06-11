import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className='footer-container'>
        <p>The Verdant Grove</p>
        <p>+64-12-3456-789</p>
        <div className='footer-info'>
            <p>10:00 AM ~ 5:00 PM (Monday - Friday)</p>
            <p>General Inquiries:  info@verdantgrove.com</p>
            <p>Customer Service:  cs@verdantgrove.com</p>
        </div>

        <div className='footer-links'>
            <Link to={'/about'}>About</Link>
            <button>Privacy Policy</button>
            <button>Contact Us</button>
        </div>
    </div>
  )
}

export default Footer