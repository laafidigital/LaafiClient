import React, { useState } from 'react'

const Latestupdate = () => {
    const buttons=['Cardiology','Nephrology','Ophthalmology']
    const contents=[`Recent developments in cardiology have revolutionized the diagnosis, treatment, and management of cardiovascular diseases, enhancing patient outcomes significantly. One notable advancement is the use of artificial intelligence (AI) and machine learning to analyze vast amounts of data from ECGs and imaging studies, facilitating early detection of conditions like atrial fibrillation and heart failure. These technologies allow for more personalized treatment plans and improved monitoring of patients’ cardiovascular health.
            Additionally, transcatheter aortic valve replacement (TAVR) has gained popularity as a minimally invasive alternative to open-heart surgery for patients with aortic stenosis, significantly reducing recovery time and complications. The advent of drug-eluting stents has improved outcomes in patients with coronary artery disease, decreasing the risk of restenosis.
            Genetic research has also made strides, uncovering links between specific gene mutations and inherited heart diseases, paving the way for targeted therapies and genetic counseling. Furthermore, remote patient monitoring technologies enable continuous tracking of heart health, allowing for timely interventions`,`The Nephrology Department specializes in diagnosing and treating kidney-related conditions. Nephrologists are experts in managing kidney diseases, including chronic kidney disease, acute kidney injury, kidney stones, glomerulonephritis, and more. They work closely with patients to manage conditions that can affect kidney function, such as diabetes and hypertension, and provide treatment options like dialysis and kidney transplantation. The department focuses on comprehensive care and prevention, helping patients maintain kidney health and overall well-being.`,
            `The Ophthalmology Department focuses on the health of the eyes and visual system, offering diagnosis, treatment, and management of eye diseases and vision disorders. Ophthalmologists are specialized medical doctors trained to address a wide range of eye issues, from common conditions like cataracts, glaucoma, and refractive errors (such as myopia and hyperopia) to complex retinal and corneal diseases.`
        ]

    const [displayData,setdisplayData]=useState({department:'Cardiology',discription:`Recent developments in cardiology have revolutionized the diagnosis, treatment, and management of cardiovascular diseases, enhancing patient outcomes significantly. One notable advancement is the use of artificial intelligence (AI) and machine learning to analyze vast amounts of data from ECGs and imaging studies, facilitating early detection of conditions like atrial fibrillation and heart failure. These technologies allow for more personalized treatment plans and improved monitoring of patients’ cardiovascular health.
            Additionally, transcatheter aortic valve replacement (TAVR) has gained popularity as a minimally invasive alternative to open-heart surgery for patients with aortic stenosis, significantly reducing recovery time and complications. The advent of drug-eluting stents has improved outcomes in patients with coronary artery disease, decreasing the risk of restenosis.
            Genetic research has also made strides, uncovering links between specific gene mutations and inherited heart diseases, paving the way for targeted therapies and genetic counseling. Furthermore, remote patient monitoring technologies enable continuous tracking of heart health, allowing for timely interventions.`})    
     const handleClick=(id)=>{
        const dep=buttons[id]
        const disc=contents[id]
        setdisplayData((prev)=>({
            ...prev,
            department:dep,
            discription:disc
        }))
     }   
  return (
    <div className='aboutlaafi'>
        <h2>Latest Updates In Medicine</h2>
        <div className='latestcontainerdiv'>
            <div className='latestbtndiv'>
                {buttons.map((item,index)=>(
                    <button className='depbutton' onClick={()=>handleClick(index)}>{item}</button>
                ))}
            </div>
            <div className='latestcontentdiv'>
                <h3>Developments in {displayData.department}</h3>
                <p>{displayData.discription}</p>
                <div>
                    <button className='depbutton'>Learn More...</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Latestupdate
