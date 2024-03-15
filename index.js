import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';

import * as UserController from './contollers/UserController.js';

import checkAuth from './utils/checkAuth.js';


mongoose.connect('mongodb+srv://admin:7798garys@prokhordb.pjnypyc.mongodb.net/blog')
        .then(() => {
            console.log('DB ok');
        })
        .catch((err) => {
            console.log('DB error', err);
        })

const app = express();

app.use(express.json());

app.get('/auth/me', checkAuth, UserController.getMe);
app.post('/auth/login', UserController.login)
app.post('/auth/register', registerValidation, UserController.register)

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server Ok');
})