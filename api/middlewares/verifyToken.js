import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if(!authHeader){
            return res.status(401).json('You are not authenticated!');
        }

        const token = authHeader.split(" ")[1];
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();

    } catch (error) {
        res.status(401).send({ error: error.message });
    }

}
    