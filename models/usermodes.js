import mongoose from 'mongoose';

const userSchema  = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        unique:true,
        select:false
    },
});


export const User = mongoose.model("User",userSchema);