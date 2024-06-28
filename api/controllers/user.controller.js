// import { errorHandler } from "../utils/error";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req,res)=>{
    res.json({message:'API is working'});
}

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'UnAuthorized Update Access!'));
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(400, 'Hey Dragon! Password must atleast contain size of 6'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    if(req.body.username){
        if(req.body.username.length < 7){
            return next(errorHandler(400, 'Dragon Id needs minimum 7 characters!'));
        }
        if(req.body.username.length > 20){
            return next(errorHandler(400, 'Dragon Id exeeds 20 characters!'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'Dragon Id allows no spaces!'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'Dragon Id allows no upper case characters!'))
        }
    }
        // if(req.body.username.match(/^[a-zA-Z0-9]+$/)){
        //     return next(errorHandler(400, 'Dragon Id allows no Special Characters!'));
        // }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture
                }
            }, {new:true});
            const {password, ...rest} = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error)
        }
    
}
