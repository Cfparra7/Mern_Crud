import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    }
},

{
    timestamps:true, // se envia para guardar el created y el update en todos los shemas


})
export default mongoose.model('User', userSchema)