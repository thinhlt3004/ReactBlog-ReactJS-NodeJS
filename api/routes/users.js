import express from 'express';
const router =  express.Router();
import UserController from './../controllers/UserController.js';
import {verifyToken} from './../middlewares/verifyToken.js';

//UPDATE
router.put('/:id',verifyToken, UserController.update);


//DELETE
router.delete('/:id', verifyToken, UserController.delete);

//GET USER
router.get('/:id', verifyToken, UserController.getInfos);

//GET CURRENT USER
router.get('/', verifyToken, UserController.currentUser);

export default router;