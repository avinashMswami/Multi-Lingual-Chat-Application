// import React from 'react'

import { Link } from "react-router-dom"
import GenderCheckbox from "./GenderCheckBox"
import Languages from "./Languages"
import { useState } from "react"
// import { on } from "nodemon"
import useSignUp from "../../hooks/useSignUp"

function SignUp() {

  const [input,setInput] = useState({
    fullName:"",
    userName:"",
    password:"",
    confirmPassword:"",
    gender:"",
    language:""
  })

  const {loading,signup} = useSignUp()
  const onCheckboxChange = (gender)=>{
    setInput({...input,gender})
  }
  const onLanguageChange = (language)=>{
    setInput({...input,language})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log(input);
    await signup(input)
  }
  return (
    <div>
          <div className='flex flex-col justify-center items-center h-screen  '>
            <div className="w-1/3  p-6 rounded-md shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-0">
              <h1 className='text-lg font-semibold text-center text-gray-300'>
                Sign-Up <span className="text-blue-500 ">Chat Application</span>
              </h1>
              <form onSubmit={handleSubmit}>
                <div>
                <label className="label p-2 ">
                    <span className="text-lg label-text text-align-last: left-0 text-white">Fullname:</span></label>
                    <input type="text" placeholder="Enter Fullname" className="w-full input input-bordered h-8 ml-1" value={input.fullName} onChange={(e)=>{setInput({...input,fullName : e.target.value})}}/>
                  
                  <label className="label p-2 ">
                    <span className="text-lg label-text text-align-last: left-0 text-white">Username:</span></label>
                    <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-8 ml-1" value={input.userName} onChange={(e)=>setInput({...input,userName: e.target.value})} />
                                   
                  <label className="label p-2">
                    <span className="text-lg label-text text-white">Password:</span></label>
                    <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-8 ml-1.5" value={input.password} onChange={(e)=>{setInput({...input,password:e.target.value})}}/>
                  <label className="label p-2">
                    <span className="text-lg label-text text-white">Confirm Password:</span></label>
                    <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-8 ml-1.5" value={input.confirmPassword} onChange={(e)=>{setInput({...input,confirmPassword:e.target.value})}} />
                  <GenderCheckbox onCheckboxChange={onCheckboxChange} selectedGender = {input.gender}/>

                  <Languages onLanguageChange={onLanguageChange} />
                  
                  
                  <Link to='/login' className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block" >Already have an account?</Link>

                  <button className="btn btn-block btn-sm mt-2.5 hover:text-blue-600" disabled={loading}>
                    {loading? <span className="loading loading-spinner"></span> : "Sign Up!"}
                  </button >
                </div>
              </form>
            </div>
          </div>
        </div>
  )
}

export default SignUp