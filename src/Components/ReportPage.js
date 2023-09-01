import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'

function ReportPage() {
  const correctAnswers=useSelector((state) => state.quiz.userChoicedData)
  const selectedOptions=useSelector((state) => state.quiz.usercollectedData)
  const[score,setScore]=useState(0)
  const[ready,SetReady]=useState(true)
 
  useEffect(() => {
    let newScore = 0;
  
    if (
      Array.isArray(correctAnswers) &&
      correctAnswers.length > 0 &&
      Array.isArray(selectedOptions) &&
      selectedOptions.length > 0 &&
      correctAnswers[0]?.updatedAnswers
    ) {
      selectedOptions[0]?.forEach((option, index) => {
        if (correctAnswers[0].updatedAnswers[index] === option.correct_answer) {
          newScore += 1; // Increment for correct answer
        } else if (correctAnswers[0].updatedAnswers[index] !== option.correct_answer) {
          if (newScore <= 0) {
            newScore = 0;
          } else {
            newScore -= 1;
          }
        }
      });
    }
    setScore(newScore);
  }, [correctAnswers, selectedOptions]);
  setTimeout(()=>{
    SetReady(false)
  },5000)
return (
  
    <div className=''>
    {ready ? (
      <div className="loading-message flex justify-center m-44 text-xl font-bold text-black">
        <p>Your scores are being calculated. Please do not refresh the page...</p>
      </div>
    ) : (
      <>
    
    <div className='report bg-green-600 flex flex-wrap justify-between py-2 h-16 px-8 '>
    <h3 className='text-center font-bold text-3xl text-white '>REPORT</h3> 
    <div className='Results grid grid-col-1 grid-row-2 justify-center gap-2 mb-44'>
    <p className='text-white font-bold text-3xl '>Score:{score}</p>
    
    
    </div>
    </div>
    <div className='mt-12 grid grid-col-1 grid-row-3 gap-y-2 m-44'>
    {
      selectedOptions[0]?.map((option, index) => (
      <div key={index}>
        <p className='text-lg font-semibold text-slate-600 '>{option.question}</p>
        <p className='text-green-600 font-medium text-base'>Correct Answer: {option.correct_answer}</p>
        {correctAnswers[0]?.updatedAnswers[index] !== undefined ? (
          correctAnswers[0]?.updatedAnswers[index] === "" ? (
            <p className="text-green-600 font-medium text-base">Selected Answer: {option.correct_answer}</p>
          ) : correctAnswers[0]?.updatedAnswers[index] === option.correct_answer ? (
            <p className="text-green-600 font-medium text-base">Selected Answer: {correctAnswers[0].updatedAnswers[index]}</p>
          ) : (
            <p className="text-red-600 font-medium text-base">Selected Answer: {correctAnswers[0].updatedAnswers[index]}</p>
          )
        ) : (
          <p className="text-black font-medium text-base">Not Attempted</p>
        )}
       
       </div>
      
    ))
        }
    </div>
   
    
    
    </>
    )}
   
    </div>
  )
}

export default ReportPage