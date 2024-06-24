import { timeStamp } from "console";
import mongoose from "mongoose";
import { type, userInfo } from "os";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 3,
        max : 20,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    }
}, {timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;
