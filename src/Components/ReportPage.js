import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ReportPage() {
  const correctAnswers=useSelector((state) => state.quiz.userChoicedData)
  const selectedOptions=useSelector((state) => state.quiz.usercollectedData)
  const[score,setScore]=useState(0)
  const[ready,SetReady]=useState(true)
  const navigate=useNavigate()
 
 
  useEffect(() => {
    if (
      Array.isArray(correctAnswers) &&
      correctAnswers.length > 0 &&
      Array.isArray(selectedOptions) &&
      selectedOptions.length > 0 &&
      correctAnswers[0]?.updatedAnswers
    ) {
      let newScore = 0;

      selectedOptions[0]?.forEach((option, index) => {
        const userSelectedAnswer = option.correct_answer;
        const correctAnswer = correctAnswers[0].updatedAnswers[index];

        if (userSelectedAnswer === correctAnswer) {
          newScore += 1; // Increment for correct answer
        }
      });

      setScore(newScore);
    }
  }, [correctAnswers, selectedOptions]);
    

  
  setTimeout(()=>{
    SetReady(false)
  },5000)

  const handleFinish=()=>{
    navigate("/Finish")
  }
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
        {correctAnswers[0]?.updatedAnswers[index] ? (
          option.correct_answer === correctAnswers[0]?.updatedAnswers[index] ? (
            <p className='text-green-600 font-medium text-base'>Selected Answer: {correctAnswers[0]?.updatedAnswers[index]}</p>
          ) : (
            <p className='text-red-600 font-medium text-base'>Selected Answer: {correctAnswers[0]?.updatedAnswers[index]}</p>
          )
        ) : (
          <p className='text-gray-600 font-medium text-base'>Not Attempted</p>
        )}
       
       </div>
      
    ))
        }
    </div>
    <div className=' mb-44 justify-center flex '>
    <button className='bg-green-600 w-32 rounded-lg h-8 text-2xl font-semibold text-white cursor-pointer hover:bg-green-800' 
    onClick={()=>handleFinish()}>FINISH</button></div>
    
    
    </>
    )}

    
   
    </div>
  )
}

export default ReportPage