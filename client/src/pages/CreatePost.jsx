import React, { useState } from 'react';
import {Alert, Button, FileInput, Select, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handelUploadImage = async()=>{
    try {
      if(!file){
        setImageUploadError('Select an image dude!');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setImageUploadProgress(progress.toFixed(0))
        },
        (error)=>{
          setImageUploadError('Sorry dude! Image upload failed');
          setImageUploadProgress(null);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({...formData, image:downloadURL})
          })
        }
      )
    } catch (error) {
      setImageUploadError('Sorry dude! Image upload failed');
      setImageUploadProgress(null)
      console.log(error)
    }
  }

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
          <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])} />
          <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handelUploadImage} disabled={imageUploadProgress}>
            {
              imageUploadProgress ? <div className="w-16 h-16">
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0} %`} />
              </div>
              : 'Upload Cover Image'
            }
          </Button>
        </div>
        {imageUploadError && (
          <Alert color='failure' >{imageUploadError}</Alert>
        )}
        {
          formData.image && (
            <img src={formData.image} alt="upload" className='w-full h-72 object-cover' />
          )
        }
        <ReactQuill theme="snow" placeholder='Insert your thoughts here...' className='h-72 mb-12' required />
        <Button type='submit' gradientDuoTone='purpleToPink'>Publist your new POST</Button>
      </form>
    </div>
  )
}
