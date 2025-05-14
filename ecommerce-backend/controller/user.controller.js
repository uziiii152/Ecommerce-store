
import User from '../models/user.model.js'
import { connectDb } from '../Db/configDb.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const signUp = async (req,res)=>{
   try {
    await connectDb()
    const {username,email,password} =  req.body

    if(!username || !email || !password){
        return res.status(400).json({
            success:false,
            message:'enter all the fields'
        })
    }

    const existedUser = await User.findOne({email})

    if(existedUser){
        return res.status(409).json({
            success:false,
            message:'user already existed'
        })
    }

    const hashPassword = await bcrypt.hash(password,10)

await User.create({username,email,password:hashPassword})


    return res.status(201).json({
        success:true,
        message: 'User successfully created'
    })





   } catch (error) {

    console.log('user failed to sign Up');
    
    return res.status(500).json({
        success:false,
        message:"internal server error",
        data: error.message
    })
   } 
}

export const signIn = async (req, res) => {
    try {
        const {email,password} = req.body
        if (!email || !password) {
            return res.status(409).json({
                success: false,
                message: "Please give the email and password"
            })
        }
        const user = await User.findOne({email})
    
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
    
        const checkPassword = await bcrypt.compare(password,user.password)
    
        if(!checkPassword){
            return res.status.json({
                success:false,
                message:"password is not correct"
            })
        }
    
        const token = jwt.sign( { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' })

    
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            token,
            user:{
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Sign-in error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}