import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js'

import {response} from "express";

export const register = async (req, res) => {
    const {email, password, username} = req.body;
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash, //#para encriptar la contraseña
        });
        const userSaved = await newUser.save(); // para que se pueda usar el await se tiene que usar el async de la linea 3 y tiene que estar en un try catch
        const token = await createAccessToken({id: userSaved._id});
        res.cookie('token', token);
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,

        });
    } catch (error) {
        console.log(error);

    }
};
export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const userFound = await User.findOne({email})
        if (!userFound) return res.status(400).json({message: "User not Fount"});

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({message: "Incorrect Password"})

        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token);
        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,

        });
    } catch (error) {
        console.log(error);

    }
};

export const logout =  (req, res) => {
    res.cookie('token', "", {
            expires: new Date(0),
        })
    return res.sendStatus(200);
};