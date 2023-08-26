import JobModel from '../models/jobModel.js';
import UserModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';

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
    const obj = { ...req.body }
    delete obj.password
    const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, obj, {
        new: true
    })
    res.status(StatusCodes.OK).json({
        message: 'Update current user',
        updatedUser
    })
}