import React from 'react';
import {Button, FileInput, Select, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Ready to post something!</h1>
      <form className='flex flex-col gap-4'>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput type='text' placeholder='Title goes here..' required id='title' className='flex-1' />
          <Select>
            <option value='uncategorized'>Select category</option>
            <option value='tech'>Technology</option>
            <option value='travel'>Travel</option>
            <option value='history'>History</option>
            <option value='auto'>Automobiles</option>
            <option value='space'>Space</option>
            <option value='study'>Study</option>
            <option value='movies'>Movies</option>
            <option value='music'>Music</option>
            <option value='biography'>Biography</option>
            <option value='science'>Science</option>
            <option value='fiction'>Fictional</option>
            <option value='game'>Gaming</option>
            <option value='gadget'>Electronic Gadget</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dashed p-3">
          <FileInput type='file' accept='image/*' required />
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload image</Button>
        </div>
        <ReactQuill theme="snow" placeholder='Insert your thoughts here...' className='h-72 mb-12' required />
        <Button type='submit' gradientDuoTone='purpleToPink'>Publist your new POST</Button>
      </form>
    </div>
  )
}
