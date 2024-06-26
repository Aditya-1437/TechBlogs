import { Button } from 'flowbite-react'
import React from 'react'
import {AiFillGoogleSquare} from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
import { app } from '../firebase';
import { json } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handelGoogle = async()=>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        try {
            const resultFromGoogle = await signInWithPopup(auth,provider)
            const res = await fetch('/api/auth/googl',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    photoURL: resultFromGoogle.user.photoURL,
                })
            })
            const data = res.json()
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            
        }
    }

  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handelGoogle}>
        <AiFillGoogleSquare className='w-6 h-6 mr-2' />
        Enter using Google</Button>
  )
}
