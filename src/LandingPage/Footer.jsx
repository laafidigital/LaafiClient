import React from 'react'
import laafilogo from '../assets/Logos/laafi logo.png'
import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import netsrishitilogo from '../assets/Logos/footernetsrishti.png'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const department=['Cardiology','Surgery','Laboratory Services','Pharmacy','Pediatrics','Neurology']
    const hospitals=['Hospitals1','Hospitals2']
       const navigate=useNavigate()
  return (
    <div className='footer_container'>
        <div className='footer_logdiv'>
            <img src={laafilogo}/>
            {/* <p>health empowered</p> */}
        </div>
        <div className='footersub2div_main'>
            <div className='footersub2div2'>
                <div className='footersub2'>
                    <div className='footerlinkdiv'>
                        <a onClick={()=>navigate('privacy')}>Privacy</a>
                        <a onClick={()=>navigate('documentation')}>Documentation</a>
                        <a onClick={()=>navigate('termsofuse')}>Terms of Use</a>
                        <a onClick={()=>navigate('support')}>Support</a>
                    </div>
                    <div className='connectionlink'>
                        <p>Connect With Us</p>
                        <div>
                                {/* <a href="https://wa.me/00000" target="_blank" rel="noopener noreferrer">
                                    <FaWhatsapp className='footericon' />
                                </a> */}
                                <a href="https://www.instagram.com/laafi_app/" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className='footericon' />
                                </a>
                                <a href="https://www.facebook.com/profile.php?id=61568603301512" target="_blank" rel="noopener noreferrer">
                                    <BiLogoFacebookSquare className='footericon' />
                                </a>
                            </div>
                    </div>
                </div>
            </div>
            <div className='footersub2div1'>
                <h4>Departments</h4>
                {department.map((item)=>(
                    <p>{item}</p>
                ))}
            </div>
            {/* <div className='footersub2div1'>
                <h4>Our Hospitals</h4>
                {hospitals.map((item)=>(
                    <p>{item}</p>
                ))}
            </div> */}
        </div>
            <div className='footerhrline'></div>
        <div className='d-flex justify-content-end align-items-center'>
            <p style={{margin:0,fontSize:'15px',paddingRight:'10px'}}>powered by</p><img className='netsrishtilogo' src={netsrishitilogo}/>
        </div>
    </div>
  )
}

export default Footer
