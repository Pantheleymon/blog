import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js';

import * as UserController from './contollers/UserController.js';
import * as PostController from './contollers/PostController.js';

import checkAuth from './utils/checkAuth.js';
import { check } from 'express-validator';


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
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, PostController.update);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server Ok');
})