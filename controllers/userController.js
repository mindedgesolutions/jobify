import JobModel from '../models/jobModel.js';
import UserModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
    const user = await UserModel.findOne({ _id: req.user.userId })

    res.status(StatusCodes.OK).json({
        // message: 'Get current user',
        user
    })
}

export const getApplicationStats = async (req, res) => {
    const users = await UserModel.countDocuments()
    const jobs = await JobModel.countDocuments()
    console.log(users)

    res.status(StatusCodes.OK).json({
        message: 'Get applicatrion stats',
        users,
        jobs
    })
}

export const updateUser = async (req, res) => {
    const newUser = { ...req.body }
    delete newUser.password

    if (req.file){
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        newUser.avatar = response.secure_url
        newUser.avatarPublicId = response.public_id
    }

    const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, newUser)

    if (req.file && updatedUser.public_id){
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
    }

    res.status(StatusCodes.OK).json({
        message: 'Update current user',
        updatedUser
    })
}