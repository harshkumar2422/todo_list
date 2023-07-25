import {app} from './app.js'



app.listen(process.env.PORT,()=>{
    console.log(`server is working at local host ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
})