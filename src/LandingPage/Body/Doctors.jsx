import React from 'react'
import piere from '../../assets/landingPage/patners/pierre.png'
import suresh from '../../assets/landingPage/patners/suresh.jpeg'
import ramesh from '../../assets/landingPage/patners/ramesh.jpeg'
import girish from '../../assets/landingPage/patners/girishphoto.png'


const Doctors = () => {
    const Doctors=[
        {img:piere,name:'K Pierre Wininga'},
        {img:suresh,name:'Suresh Kumar Nediyadath'},
        {img:ramesh,name:'Ramesh Kumar Nediyadath'},
        {img:girish,name:'Girish Kumar Nediyadath'}
    ]
  return (
    <div className='aboutlaafi'>
          <h2>Our Partners</h2>
          <div className='expertdocdiv'>
            {Doctors.map((item,index)=>(
                <div className='expertdocsubdiv'>
                    <div><img src={item.img}/></div>
                    <h5>{item.name}</h5>
                    {/* <p>{item.Department}</p>
                    <p>{item.Experience}</p> */}
                </div>
            ))}
          </div>
    </div>
  )
}

export default Doctors
