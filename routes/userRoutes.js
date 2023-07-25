 import express from 'express';
import { getallUser, getmyprofile, login, logout, register } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

 const router = express.Router();

 router.get('/',(req,res)=>{

    res.send('server is working fine');
 })
 router.post('/register',register);
 router.post('/login',login)
 router.get('/getalluser',getallUser);
 router.get('/me',isAuthenticated,getmyprofile)
 router.get('/logout',logout)

 export default router