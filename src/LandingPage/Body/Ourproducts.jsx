import React from 'react'

const Ourproducts = () => {
    const products=[{name:'Q-serv'},{name:'J'}]
  return (
    <div className='aboutlaafi'>
         <h2>More Products From netSrishti</h2>
         <div className='ourproduct'>
            {products.map((item)=>(
                <div className='ourproductsubdiv'>
                    <div className='ourproduct_img'>
                    </div>
                    <p>{item.name}</p>
                </div>
            ))}
         </div>
    </div>
  )
}

export default Ourproducts
