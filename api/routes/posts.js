import express from 'express';
const router =  express.Router();
import PostController from './../controllers/PostController.js';
import {verifyToken} from './../middlewares/verifyToken.js';

//CREATE
router.post('/',verifyToken, PostController.create);
//UPDATE
router.put('/:id',verifyToken, PostController.update);
//GET 
router.get('/:id',verifyToken, PostController.getInfos);
//DELETE
router.delete('/:id',verifyToken, PostController.delete);
//GET ALL
router.get('/', verifyToken, PostController.index);
//SEARCH BY TITLE
router.get('/find/:key', verifyToken, PostController.search);
export default router;