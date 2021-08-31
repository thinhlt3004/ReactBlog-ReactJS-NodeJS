import express from 'express';
const router =  express.Router();
import CategoryController from '../controllers/CategoryController.js';
import {verifyToken} from './../middlewares/verifyToken.js';
//CREATE 
router.post('/',verifyToken, CategoryController.create);

///GET ALL
router.get('/',verifyToken, CategoryController.index);

export default router;