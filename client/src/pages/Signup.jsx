import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
              via-purple-500 to-pink-500 rounded-lg text-white'>Dragons Awaken</span>
              Here..!
          </Link>
          <p className='text-lg mt-5'>
            Unlock a world of stories waiting to unfold.
            SignUp for our community..!
          </p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='DragonName' />
              <TextInput type='text' placeholder='Alphabets only' id='username' />
            </div>
            <div>
              <Label value='E-Mail' />
              <TextInput type='email' placeholder='dragon@fire.com' id='email' />
            </div>
            <div>
              <Label value='Password' />
              <TextInput type='password' placeholder='dragons posses strong senses' id='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>Become the Dragon</Button>
          </form>
          <div className='flex gap-2 text-sm mt-3'>
            <span>Already a dragon?</span>
            <Link to='/sign-in' className='text-purple-500'>Enter the Dungeon</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
