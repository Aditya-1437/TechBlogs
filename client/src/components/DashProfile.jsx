import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import { FiLogOut } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function DashProfile() {
    const {currentuser}  = useSelector((state)=>state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileURL, setImageFileURL] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerReference = useRef()

    const handelImageChange = (e)=>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileURL(URL.createObjectURL(file));
        }
    };
    useEffect(()=>{
        if(imageFile){
            uploadImage();
        }
    },[imageFile]);
    const uploadImage = async ()=>{
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write : if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        setImageFileUploadError(null)
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef,imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error)=>{
                setImageFileUploadError('Image Uploading Error (File Size > 2MB [Recomended:<2MB])');
                setImageFileUploadProgress(null)
                setImageFile(null)
                setImageFileURL(null)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    setImageFileURL(downloadURL)
                });
            }
        )
    }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-6 text-center font-bold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-5'>
            <input type="file" accept='image/*' onChange={handelImageChange} ref={filePickerReference} hidden />
            
            <div className="relative w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full" onClick={()=>{filePickerReference.current.click()}}>
                {imageFileUploadProgress && (
                    <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress} %`} strokeWidth={5}
                        styles={
                            {
                                root:{
                                    width:'100%',
                                    height:'100%',
                                    position:'absolute',
                                    top:0,
                                    left:0,
                                },
                                path:{
                                    stroke:`rgba(62,152,199,${imageFileUploadProgress/100})`,
                                }
                            }
                        }
                    />
                )}
                <img src={imageFileURL || currentuser.profilePicture} alt="user" 
                className={`rounded-full w-full h-full object-cover border-8 ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-50'}`} />

            </div>
            {imageFileUploadError && (       
            <Alert color='failure'>
                {imageFileUploadError}
            </Alert>
            )}
            <TextInput type='text' id='username' placeholder='Change Dragon Identity' defaultValue={currentuser.username} />
            <TextInput type='email' id='email' placeholder='Change Dragon email' defaultValue={currentuser.email} />
            <TextInput type='password' id='password' placeholder='Change Dragon password' />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                Update Identity
            </Button>
            <div className="flex justify-between text-red-600">
                <span className='cursor-pointer'><MdDeleteOutline />Delete Your Dragon Account</span>
                <span className='cursor-pointer'><FiLogOut /> Exit the Nest</span>
            </div>
        </form>
    </div>
  )
}
