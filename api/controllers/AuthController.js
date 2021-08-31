import { UserModel } from './../models/User.js';
import jwt from 'jsonwebtoken';

class AuthController {
    // static refreshTokens = [];
    generateAccessToken = (user) => {
        return jwt.sign({ id: user._id}, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15m",
        });
    };
    generateRefreshToken = (user) => {
        return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET);
    };
    register = async (req, res) => {
        try {
            const newUser = new UserModel(req.body);
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }


    login  = async (req, res) => {
        try {
            const user = await UserModel.FindByCredentials(req.body.email, req.body.password);
            if(!user){
                res.status(401);
            }
            const {password, ...otherInfos} = user._doc;
            const accessToken = this.generateAccessToken(user);
            const refreshToken = this.generateRefreshToken(user);
            res.status(200).json({...otherInfos, accessToken, refreshToken});
            // refreshTokens.push(refreshToken);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    resfreshToken = async (req, res) => {
        try {
            const refreshToken = req.body.token;
            if (!refreshToken) return res.status(401).json("You are not authenticated!");
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            // console.log(decoded.id);
            const user = await UserModel.findOne({ _id: decoded.id });
            if (!user){
                res.status(404).json("Cant found user")
            };
            

            const newAccessToken = this.generateAccessToken(user);
            const newRefreshToken = this.generateRefreshToken(user);
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new AuthController();