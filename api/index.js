import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import {db} from './db/connection.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import postRoute from './routes/posts.js';
import categoryRoute from './routes/categories.js';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/post',postRoute);
app.use('/api/category',categoryRoute);



app.listen(PORT, () => {
    console.log(`Backend server is running is PORT ${PORT}`);
});