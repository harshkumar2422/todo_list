import mongoose from 'mongoose';

export const connectDb = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('server is connected with database')
    }).catch((e)=>{
        console.log(e);
    })
}