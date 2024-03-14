import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://admin:7798garys@prokhordb.pjnypyc.mongodb.net/')
        .then(() => {
            console.log('DB ok');
        })
        .catch((err) => {
            console.log('DB error', err);
        })

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/auth/login', (req, res) => {
    console.log(req.body);

    if (req.body.email === '') {

        const token = jwt.sign({
            email: req.body.email,
            fullName: 'Иван Ермилов'
        },
        'secret123'
        );

        res.json({
            success: true,
            token,
        })
    }
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server Ok');
})