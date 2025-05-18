import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PostPychomatric } from '../../Store/Actions';
import { useLocation, useNavigate } from 'react-router-dom';


const questions = [
  {
    question: 'Little interest or pleasure in doing things',
  },
  {
    question: 'Feeling down, depressed or hopeless',
  },
  {
    question:'Trouble falling or staying asleep, or sleeping too much',
  },
  {
    question:'Feeling tired or having little energy'
  },
  {
    question:'Poor appetite or overeating',
  },
  {
    question:'Feeling bad about yourself - or that you are a failure, or have let yourself or your family down'
  },
  {
    question:'Trouble concentrating on things, such as reading the newspaper or watching television'
  },
  {
    question:'Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual'
  },
  {
    question:'Thoughts that you would be better off dead, or of hurting yourself in some way'
  },
  {
    question:'If you checked off any problems, how difficult have these problems made it for you to do your work, take care of things at home or get along with other people?'
  }
  
];

const commonOptions = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];




const Pychomatric = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const token=localStorage.getItem('accessToken')
    const decodeToken=jwtDecode(token)
    const mrnno=decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]

    

    const [answers, setAnswers] = useState({});
    const [scores,setscores]=useState()
    const [submitted, setSubmitted] = useState(false);
    const [Time, setTime] = useState(null);


  const pathname=useLocation().pathname
  const clickBack=()=>{
    switch(true){
      case pathname.includes('/Home'):
      navigate('../admindashboard');
      break;
      case pathname.includes('/doctor'):
      navigate('../doctordashboard');
      break
      case pathname.includes('/nurse'):
      navigate('../nursedashboard');
      break
      case pathname.includes('/pharmacyhome'):
      navigate('../pharmacydashboard');
      break
      case pathname.includes('/receptionhome'):
      navigate('../receptiondashboard');
      break
    }
  }


    useEffect(() => {
        if (submitted) {
            const calculatedScore = calculateScore();
            setTime({...Time,calculatedScore});
        }
    }, [submitted]);

    // useEffect(()=>{
    //     if(token){
    //        const decodeToken=jwtDecode(token)
    //        const mrnno=decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    //        if(mrnno){
    //         setAnswers({...answers,mrn:mrnno})
    //        }
    //     }
    
    // },[token])
  
    const handleOptionSelect = (questionIndex, optionIndex) => {
      setAnswers({ ...answers, ['q' + questionIndex]: optionIndex });
      if (!Time) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours=String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
        const formattedStartDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
        if(formattedStartDate){
            setTime({stime:formattedStartDate})
        }
    }
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
      setSubmitted(true);
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 to month because it's zero-based
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours=String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      const formattedEndDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

        const data={
            ...answers,
            ...Time,
            etime:formattedEndDate,
            mrn:mrnno,
            score:calculateScore()
        }
    dispatch(PostPychomatric(data))

      
    };
  
    const calculateScore = () => {
      let score = 0;
      Object.values(answers).forEach((value) => {
        score += value;
      });
  
      return score;
    };  
    
  
    return (
      <div className='pychomatric_maindiv'>
        <form onSubmit={handleSubmit} className='pychomatric_form'>
        <h1 style={{fontFamily:'Times New Roman Times, serif', display:'flex',justifyContent:'center'}} >Depression self-assessment</h1>
        <div className='d-flex justify-content-end pt-2'>
             <Button startIcon={<ArrowBackIcon/>}  onClick={clickBack} style={{color:'black'}} className='m-2'>Back</Button>
           </div>
          {questions.map((question, index) => (
            <div key={index}>
                <div className='d-flex'>
                  <p>Q{index + 1}:</p>
                  <p className='pl-1'>{question.question}</p>
                </div>
              <ul>
                {commonOptions.map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label>
                      <input
                        type='radio'
                        name={`question${index}`}
                        value={option}
                        checked={answers['q' + (index + 1)] === optionIndex}
                        onChange={() => handleOptionSelect(index+1, optionIndex)}
                        disabled={submitted}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className='d-flex justify-content-center m-5'>
            {!submitted && <Button variant='contained' type="submit">Submit</Button>}
          </div>
        </form>
  
        {submitted && (
          <div>
            <h2 style={{color:'green'}}>Thank You!</h2>
            {/* <p>Your Score: {calculateScore()}</p> */}
          </div>
        )}
      </div>
    );
}

export default Pychomatric