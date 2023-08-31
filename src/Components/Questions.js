import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userNotSelected, userSelected } from '../Redux/Slice';



function Questions() {
    const[query,setQuery]=useState([])
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    // const [remainingTime, setRemainingTime] = useState(30 * 60);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    
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
       // Start the countdown timer
//  const intervalId = setInterval(() => {
//     setRemainingTime((prevTime) => prevTime - 1);
// }, 1000);

// // Clean up the interval when the component unmounts
// return () => clearInterval(intervalId);
}, []);

//Calculate minutes and seconds
// const minutes = Math.floor(remainingTime / 60);
// const seconds = remainingTime % 60;


const handleQuery=(id)=>{
    if(selectedAnswers[selectedQuestionIndex] === null){
        dispatch(userNotSelected({ id: selectedQuestionIndex }))
    }
    setSelectedQuestionIndex(id)
    }
    
const handleQuestion=()=>{
   
    setSelectedQuestionIndex(selectedQuestionIndex+1)
    }
const handleAnswers=(event)=>{
    const updatedAnswers = [...selectedAnswers]; // Created a copy of the selectedAnswers array
        updatedAnswers[selectedQuestionIndex] = event.target.value; // Updated the selected answer for the current question
        setSelectedAnswers(updatedAnswers); 
        dispatch(userSelected({ id: selectedQuestionIndex }))
       
       
}
  return (
 <>
 {selectedQuestionIndex>14?(
    <div className='flex flex-wrap justify-center'>
    <h3>Do You Want to Submit ? </h3>
    <buton>Yes</buton>
    <button>No</button>
    </div>
 ):(
<div>
<div className='header flex justify-between p-2'>
<div className='active-tabs flex justify-center w-2/3'>
   
    {[...Array(query.length)].map((_, index) => (
        <div key={index} className='px-1 flex text-lg justify-center w-16 border-2 border-black' onClick={()=>handleQuery(index)}> {index + 1}</div>
    ))}
        
</div>
<div className='flex '>
<p className='mx-1'> Attemped :{userData}</p>
<p className='mx-1'> Not Attemped :{usersData}</p>
</div>
<div className='timer flex '>
 {/* Minutes and seconds divs *
                     <div className='mx-2 text-lg font-medium'>Minutes: {minutes}</div> 
    <div className='mx-2 text-lg font-medium'>Seconds: {seconds}</div> */}
</div>
</div>
<div className='questions  h-44 items-center p-4 ml-12 '>
                {selectedQuestionIndex !== null && query[selectedQuestionIndex]?.question && (
                    <div >
                        <h3 className='font-bold text-lg '>{query[selectedQuestionIndex].question}</h3>
                        <ul>
                            {  [...query[selectedQuestionIndex]?.incorrect_answers,query[selectedQuestionIndex]?.correct_answer]
                                .map((answer, index) => (
                                <div key={index} className='my-2'>
                                    <li>
                                        <input 
                                            type="radio"
                                            name="options"
                                            id={`answer-${index}`}
                                            value={answer} // Set the value to the answer
                    
                                            onClick={handleAnswers}
                                        />
                                        <label htmlFor={`answer-${index}`} className='text-sm font-medium text-slate-800 items-center mx-2'>{answer}</label>
                                    </li>
                                </div>
                            ))}
                            
                        </ul>
                    </div>
                )}
                <div>
            
            </div>
            <div className='next my-16 flex justify-start' onClick={handleQuestion}>
            <button>Next</button></div>
            </div>
            
            </div>        
            
            )}
 </>
 
 
  )
}

export default Questions