import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { collectedData, userChoiced, userNotSelected, userSelected} from '../Redux/Slice';
import { useNavigate } from 'react-router-dom';




function Questions() {
    const[query,setQuery]=useState([])
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [remainingTime, setRemainingTime] = useState(30 * 60);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
   
    const navigate=useNavigate()
    
 const userData=useSelector((state)=>state.quiz.Selected )
 const usersData=useSelector((state)=>state.quiz.NotSelected )

    const dispatch=useDispatch()
    
     const getData=async()=>{
        const response=await fetch("https://opentdb.com/api.php?amount=15")
        const data=await response.json()
        setQuery(data.results)
        setSelectedAnswers(Array(data.results.length).fill(null));
     }

 
    useEffect(()=>{
        getData()
       
        setSelectedQuestionIndex(0);
       //Start the countdown timer
 const intervalId = setInterval(() => {
    setRemainingTime((prevTime) =>prevTime>0? prevTime - 1:prevTime=0 );
}, 1000);

// Clean up the interval when the component unmounts
return () => clearInterval(intervalId);
}, []);

//Calculate minutes and seconds
const minutes = Math.floor(remainingTime / 60);
const seconds = remainingTime % 60;


const handleQuery=(id)=>{
    if(selectedAnswers[selectedQuestionIndex] === null){
        dispatch(userNotSelected({ id: selectedQuestionIndex }))
        
    }
    setSelectedQuestionIndex(id)
  
    }
    
const handleQuestion=()=>{
  if(selectedQuestionIndex<14){
    dispatch(userNotSelected({ id: selectedQuestionIndex }))
    setSelectedQuestionIndex(selectedQuestionIndex + 1);
  }
   
   
    }
const handleAnswers=(event)=>{
    const updatedAnswers = [...selectedAnswers]; // Created a copy of the selectedAnswers array
        updatedAnswers[selectedQuestionIndex] = event.target.value; // Updated the selected answer for the current question
        setSelectedAnswers(updatedAnswers); 
        dispatch(userSelected({ id: selectedQuestionIndex }))
        dispatch(userChoiced({updatedAnswers,selectedQuestionIndex}))

        
       }

const handleSubmitData=()=>{
  dispatch(collectedData(query))
  navigate("/Report")
}


  return (
 <>
 
<div>
<div className='header flex h-16 justify-between p-2 bg-slate-300'>
<div className='active-tabs flex justify-center w-2/3'>
   
    {[...Array(query.length)].map((_, index) => (
        <div
        key={index}
            className={`px-1 flex text-slate-800 bg-sky-100 text-lg cursor-pointer font-bold hover:bg-slate-300 py-2 h-12 bg- justify-center w-16 ${
              selectedQuestionIndex === index ? 'bg-slate-300' : ''
            }`}
        onClick={() => handleQuery(index)}
      >
        {index + 1}
      </div>
    ))}
        
</div>
<div className='flex h-12 py-1 justify-center  bg-slate-200 '>
<p className='mx-1 p-2 text-base text-slate-600 font-semibold'> Attemped: {userData}</p>
<p className='mx-1 p-2 text-base text-red-600 font-semibold '> Not Attemped: {usersData}</p>
</div>
<div className='timer w-44 justify-center py-3 flex bg-white '>
<div className='mx-1 text-base text-center  text-black font-medium'>Time Left :</div>

{seconds===0 && minutes===0? (
  // If time is 0, automatically navigate to the next page and generate a report
  (() => {
    handleSubmitData();
    navigate('/Reports');
  })()
):
  minutes < 10  ? (
    <>
      <div className='text-base text-red-500 font-medium'>
        {minutes}:
      </div>
      <div className='text-base text-red-500 font-medium'>
        {seconds}
      </div>
    </>
  ) : (
    <>
      <div className='text-base font-medium'>
        {minutes}:
      </div>
      <div className='text-base font-medium'>
        {seconds}
      </div>
    </>
  )}
  


</div>
</div>
<div className='questions  h-44 items-center p-4 ml-12 '>
                {selectedQuestionIndex !== null && query[selectedQuestionIndex]?.question && (
                    <div >
                        <h3 className='font-bold text-lg '>{query[selectedQuestionIndex].question}</h3>
                        <ul>
                            {  [...query[selectedQuestionIndex]?.incorrect_answers,query[selectedQuestionIndex]?.correct_answer]
                                .map((answer, index) => (
                                <div key={index} className='my-2 '>
                                    <li>
                                        <input 
                                            type="radio"
                                            name="options"
                                            id={`answer-${index}`}
                                            value={answer} // Set the value to the answer
                    
                                            onChange={handleAnswers}
                                        />
                                        <label htmlFor={`answer-${index}`} 
                                        className='text-sm font-medium text-slate-800 items-center mx-2'>{answer}</label>
                                    </li>
                                </div>
                            ))}
                            
                        </ul>
                    </div>
                )}
                
            
            </div>
            <div className='next ml-12 my-16 flex justify-start text-center 
             ' onClick={()=>handleQuestion()}>
            <button className='text-center w-20 h-8 text-black  bg-slate-300 font-semibold text-lg rounded-md '>Next</button>
            </div>
            
            <div className='submit flex justify-end mt-44 mr-12'>
            <button className='text-center w-32 h-10 text-white hover:bg-green-950 bg-green-600 font-semibold text-xl ' onClick={()=>handleSubmitData()}>Submit</button>
            </div>
                  
            </div>
          
           
              
    
            
 </>
 
 
  )
}

export default Questions