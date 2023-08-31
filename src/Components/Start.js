import React, { useState ,useEffect  } from 'react'
import{useNavigate} from 'react-router-dom'

function Start() {
    const [email,setEmail]=useState([])
    const [showAlert, setShowAlert] = useState("");
    const navigate=useNavigate()
    useEffect(() => {
        if (showAlert !== '') {
            navigate('/Questions');
            sessionStorage.clear()
        }
    }, [showAlert, navigate]);

    const handleClick = () => {
        const enteredEmail = sessionStorage.getItem('userEmail');
        if (enteredEmail) {
            setShowAlert(enteredEmail);
        } else {
            setShowAlert('');
        }
    }

   
  return (
    <>
    <div className='navbar'>
    <h3 className='font-bold text-2xl text-center h-16 py-2 text-white  bg-green-600'>Welcome to Quizz App</h3>
    </div>
    <div className='flex  items-center justify-center h-screen'>
    <div className='address m-60  w-1/3'>
        <div className='border-2 border-black justify-center  text-center h-48 grid grid-cols-1 grid-rows-3 gap-1 py-2'>
            <p className='font-semibold text-lg text-slate-600 '>Please Enter Your Email Address</p>
            <input type="email" className='border-2 border-slate-200 text-center h-10 mx-16 rounded-lg' value={email} onChange={(e) => {
                setEmail(e.target.value);
                sessionStorage.setItem('userEmail', e.target.value); // Store the email in session storage
            }}/>
            {showAlert===""?<p className='text-red-500'>Please enter your email before proceeding.</p>:null}
            <div className='flex justify-center items-center'> 
            <button className='bg-green-600 text-center  font-bold text-white w-24 rounded-2xl text-lg' onClick={handleClick}>Submit</button></div>
  
        </div>
    </div>
</div>
    
    </>
  )
}

export default Start