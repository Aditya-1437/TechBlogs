import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password || username=='' || email==''||password==''){
        next(errorHandler(400, 'All fields are Mandatory!'));
    }

    const hashedPassword = bcryptjs.hashSync(password,10);
    

    const newUser = new User({
        username,
        email,
        password:hashedPassword
    })

    try {
        
        await newUser.save();
        res.json("success");
    } catch (error) {
        next(error)
    }

}

export const signin = async (req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password || email=='' || password==''){
        next(errorHandler(400,'Entry needs Verification!'))
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(400,'No Dragon found with this E-Mail. We doubt your Identity!'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(400,'A Dragon with invalid password. We are particular about this!'))
        }
        const token = jwt.sign(
            {id:validUser._id, isAdmin:validUser.isAdmin},process.env.jwt_secret_key
        );
        const {password:pass, ...rest} = validUser._doc;
        res.status(200).cookie('token',token,{
            httpOnly:true
        }).json(rest);
    } catch (error) {
        next(error);
    }
}

export const google = async (req,res,next)=>{
    const {name,email,googlePhotoURL} = req.body;
    try {
        const user = await User.findOne({email})
        if(user == null){
            const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.jwt_secret_key);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('token',token,{
                httpOnly:true,
            }).json(rest)
        }
        else{
            const generatePassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hash(generatePassword,10);
            const newUsr = new User({
                username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                email,
                password:hashedPassword,
                profilePicture:googlePhotoURL,
            });
            console.log(newUsr)
            await newUsr.save();
            const token = jwt.sign({id:newUsr._id, isAdmin: newUsr.isAdmin}, process.env.jwt_secret_key);
            console.log(token)
            const {password, ...rest} = newUsr._doc;
            res.status(200).cookie('token',token,{
                httpOnly:true,
            }).json(rest);
        }
    } catch (error) {
        next(error)
    }
}
