import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
            unique: true
        },
        image:{
            type: String,
            default: 'https://uploads-ssl.webflow.com/5ea82056771c9dd4b6f61bdc/626ff2a3367b0c8e41e00587_8.png'
        },
        category:{
            type: String,
            default: 'UnDefined'
        },
        slug:{
            type: String,
            required: true,
            unique: true
        }, 
    },{timestamps:true}
);

const Post = mongoose.model('Post', postSchema)

export default Post;

