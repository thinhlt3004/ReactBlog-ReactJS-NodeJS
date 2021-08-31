import { PostModel } from './../models/Post.js';
import { UserModel } from './../models/User.js';


class PostController {
    create = async (req, res) => {
        try {
            const user = await UserModel.findById(req.user.id);
            if(!user){
                res.status(404).json('Not found...');
            }
            const newPost = new PostModel();
            newPost.title = req.body.title;
            newPost.desc = req.body.desc;
            newPost.username = user.username;
            if(req.body.photo){
                newPost.photo = req.body.photo;
            }
            if(req.body.categories){
                newPost.categories = req.body.categories;
            }
            const post = await newPost.save();
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }


    update = async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if(!post){
                res.status(404).json('Not Found Post...');
            }
            const user = await UserModel.findById(req.user.id);
            if(!user){
                res.status(404).json('Not Found User...');
            }
            if(user.username !== post.username){
                res.status(401).json('You are not allowed to edit this post...');
            }
            try {
                const updatedPost = await PostModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new : true})
                res.status(200).json(updatedPost);
            } catch (error) {
                res.status(500).json(error);
            }


        } catch (error) {
            res.status(500).json(error);
        }
    }

    delete = async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if(!post){
                res.status(404).json('Not Found Post...');
            }
            const user = await UserModel.findById(req.user.id);
            if(!user){
                res.status(404).json('Not Found User...');
            }
            if(user.username !== post.username){
                res.status(401).json('You are not allowed to edit this post...');
            }
            try {
                await PostModel.findByIdAndDelete(req.params.id);
                res.status(200).json('Deleted Successfully...');
            } catch (error) {
                res.status(500).json(error);
            }


        } catch (error) {
            res.status(500).json(error);
        }
    }
    getInfos = async (req, res) => {
        try {
            const post = await PostModel.findById(req.params.id);
            if(!post){
                res.status(404).json('Not Found Post...');
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    index = async (req, res) => {
        const username = req.query.username;
        const category = req.query.category;
        try {
            let posts;
            if(username){
                posts = await PostModel.find({username: username});
            }else if(category){
                posts = await PostModel.find({categories: {$in: [category]}});
            }else{
                posts = await PostModel.find({});
            }
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    }


    search = async (req, res) => {
        try {
            const key = req.params.key.toLowerCase();
            const post = await PostModel.find({title: new RegExp('.*'+key+'.*', 'i')});
            if(!post){
                res.status(404).json({message: 'Not Found'});
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new PostController();