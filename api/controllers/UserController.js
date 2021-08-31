import { UserModel } from './../models/User.js';
import {PostModel } from './../models/Post.js';
import bcrypt from 'bcrypt';
class UserController{
    update = async (req, res) => {
        if(req.user.id === req.params.id){
            if(req.body.password){
                req.body.password = bcrypt.hashSync(req.body.password, 8);
                
            }
            try {
                const updateUser = await UserModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new : true});
                res.status(200).json(updateUser);
            } catch (error) {
                res.status(500).json(error);
            }
            
        }else{
            res.status(403).json('You can update only your account...');
        }
    }


    delete = async (req, res) => {
        if(req.user.id === req.params.id){
            try {
                const user = await UserModel.findById(req.params.id);
                if(!user){
                    res.status(404).json('Not Found User...');
                }
                await PostModel.deleteMany({username: user.username});
            } catch (error) {
                res.status(500).json(error);
            }

            try {
                await UserModel.findByIdAndDelete(req.params.id);
                res.status(200).json('User has been deleted....');
            } catch (error) {
                res.status(500).json(error);
            }
        }else{
            res.status(403).json('You can update only your account...');
        }
    }


    getInfos = async (req, res) =>{        
            try {
                const user = await UserModel.findById(req.params.id);
                if(!user){
                    res.status(404).json('Not Found...');
                }
                const {password, ...other} = user._doc;
                res.status(200).json(other);
            } catch (error) {
                res.status(500).json(error);
            }        
    }

    currentUser = async (req, res) => {
        try {
            const user = await UserModel.findById(req.user.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new UserController();