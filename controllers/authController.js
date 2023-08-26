import UserModel from '../models/userModel.js';
import { StatusCodes } from 'http-status-codes';
import { hashedPassword, comparePasswords } from '../utils/passwordUtils.js'
import { createJWT } from '../utils/tokenUtils.js';
import { UnauthenticatedError, UnauthorizedError } from '../errors/customErrors.js';

export const register = async (req, res) => {
    req.body.password = await hashedPassword(req.body.password)

    const user = await UserModel.create(req.body)
    res.status(StatusCodes.CREATED).json({
        message: 'User created',
        user
    })
}

export const login = async (req, res) => {
    const user = await UserModel.findOne({email: req.body.email})
    if (!user) throw new UnauthenticatedError('Invalid credentials')

    const isPasswordCorrect = await comparePasswords(req.body.password, user.password)
    if (!isPasswordCorrect) throw new UnauthenticatedError('Incorrect password')

    const token = createJWT({userId: user._id, role: user.role})

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    })
    res.status(StatusCodes.OK).json({
        message: 'User logged in'
    })
}

export const logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
    res.status(StatusCodes.OK).json({
        message: 'User logged out'
    })
}