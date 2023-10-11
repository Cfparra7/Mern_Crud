import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {token} from "morgan";

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
//#uso del json web token
        jwt.sign(
            {id: userSaved._id},
            'secret123',
            {expiresIn: "1d",},
            (err, token) => {
                if (err) console.log(err);
                res.json({token});
            }
        );
// se quita esta parte del codigo porque ya se manda el token
  /*      res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,

        });*/
    } catch (error) {
        console.log(error);

    }
};
export const login = (req, res) => res.send('login');