import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';

export const verifyToken = (req,res,next) => {
    const tok = req.cookies.token;
    if(!tok){
        return next(errorHandler(401,'UnAuthorized Access Found!'))
    }
    jwt.verify(tok,process.env.jwt_secret_key,(err, user)=>{
        if(err){
            return next(errorHandler(401, 'UnAuthorized Access Found!'));
        };
        req.user = user;
        next();
    });
};

