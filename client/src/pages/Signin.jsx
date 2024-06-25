import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'

export default function Signin() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  
  const handelSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return setErrorMessage("Dragons leave nothing. Fill everything");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/sign-in',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success==false){
        return setErrorMessage(data.message)
      }
      setLoading(false);
      if(res.ok){
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }


  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
              via-purple-500 to-pink-500 rounded-lg text-white'>Hey Dragon!</span>
              Welcome Home..!
          </Link>
          <p className='text-lg mt-5'>
            Unlock a world of stories waiting to unfold.
            Please authenticate yourself..!
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handelSubmit}>
            {/* <div>
              <Label value='DragonName' />
              <TextInput type='text' placeholder='Alphabets only' id='username' onChange={handelChange} />
            </div> */}
            <div>
              <Label value='E-Mail' />
              <TextInput type='email' placeholder='dragon@fire.com' id='email' onChange={handelChange} />
            </div>
            <div>
              <Label value='Password' />
              <TextInput type='password' placeholder='dragons posses strong senses' id='password' onChange={handelChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (<><Spinner size='sm' /><span className='pl-3'>Loading...</span></>) : 'Enter the Dungeon'}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-3'>
            <span>Not a dragon yet..?</span>
            <Link to='/sign-up' className='text-purple-500'>Become a Dragon</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
