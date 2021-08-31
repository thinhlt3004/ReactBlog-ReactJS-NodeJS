import express from 'express';
const router =  express.Router();
import AuthController from './../controllers/AuthController.js';


//REGISTER
router.post('/register', AuthController.register);

//LOGIN
router.post('/login', AuthController.login);
//REFRESH TOKEN
router.post('/refresh', AuthController.resfreshToken);

export default router;