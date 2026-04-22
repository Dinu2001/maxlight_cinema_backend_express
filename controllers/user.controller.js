import User from "../models/user.js";
import bcrypt from "bcryptjs";



async function register(req, res) {
    try{
        const {firstName,lastName,email,phoneNumber,password,role,status } = req.body;

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({error:"user already exists"});

        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password:hashPassword,
            role,
            status: status || "ACTIVE"
        })
        return res.status(200).json({
            message: "user save successfully",
            data: firstName,lastName
        });
    }catch(err){
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}


async function getUserDetails(req, res) {
    try{
        const users = await User.find().select(
            "firstName lastName email phoneNumber role status"
        );
        res.status(200).json({
            message: "User details found",
            data: users
        });
    }catch(err){
        return res.status(500).json({
            message: "server error",
            error: err.message
        })
    }
}



async function updateUser(req, res) {
    try{
        const {firstName,lastName,email,phoneNumber,role,status } = req.body;
        const id = req.params.id;
        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({error:"user not found"});

        }
        const newUser = await User.findByIdAndUpdate(id, {
            firstName,lastName,email,phoneNumber,role,status
        }, {new:true})
        return res.status(200).json({
            message: "user update successfully",
            data: newUser
        });
    }catch(err){
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}


async function deleteUser(req, res) {
    try{
        const id = req.params.id;

        const user = await User.findById(id)
        if(!user){
            return res.status(400).json({error:"user not found"});

        }
        const deleteuser = await User.findByIdAndDelete(id)
        return res.status(200).json({
            message: "user delete successfully",
            data:deleteuser
        });
    }catch(err){
        return res.status(500).json({
            message: "server error",
            error: err.message
        });
    }
}






export default {register,getUserDetails,updateUser,deleteUser};