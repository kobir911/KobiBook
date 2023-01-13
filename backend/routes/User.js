
const express = require('express');


const userRouter = express.Router();

userRouter.get('/user' , (req ,res) => {
    res.status(200).send('welcome to home user');
})




module.exports = userRouter;
