import mongoose from 'mongoose';
const connect = mongoose.connect('mongodb+srv://dhiyaneshsasi03:asdfghjkl03@news-wave.cmhqbkz.mongodb.net/news-wave?retryWrites=true&w=majority&appName=news-wave')



//checking connection
connect.then(() => {
    console.log("Conencted to mongodb successfully !!");
})
.catch((err) => {
    console.log("Database cannot be connected :(" , err);
    
})



//creating schema for users collection
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


// Creating model for users
const collection = new mongoose.model("users", UserSchema);


export default collection;