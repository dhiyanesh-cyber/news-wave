import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const connect = mongoose.connect(process.env.MONGO_URL)



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
        unique: true,
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