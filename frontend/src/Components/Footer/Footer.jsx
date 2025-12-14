import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png'
import pintester_icon from '../Assets/pintester_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className='footer-links'>
            <li className='link'>Company</li>
            <li className='link'>Products</li>
            <li className='link'>Offices</li>
            <li className='link'>About</li>
            <li className='link'>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="" />
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ {currentYear} - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer
