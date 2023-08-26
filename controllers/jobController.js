import jobModel from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';

export const getAllJobs = async (req, res) => {
    const jobs = await jobModel.find({ createdBy: req.user.userId })

    res.status(StatusCodes.OK).json({
        data: jobs,
    });
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const { company, position } = req.body;
    const job = await jobModel.create(req.body)

    res.status(StatusCodes.CREATED).json({
        message: `Job created`,
        data: job,
    });

}

export const getSingleJob = async (req, res) => {
    const job = await jobModel.findById(req.params.id)

    res.status(StatusCodes.OK).json({
        data: job,
    });
}

export const updateJob = async (req, res) => {
    const job = await jobModel.findById(req.params.id);
    const updatedJob = await jobModel.findByIdAndUpdate(id, req.body, {
        new: true
    })

    res.status(StatusCodes.OK).json({
        message: `Job modified`,
        data: updatedJob,
    });
}

export const deleteJob = async (req, res) => {
    const removeJob = await jobModel.findByIdAndDelete(req.params.id)

    res.status(StatusCodes.NO_CONTENT).json({
        message: `Job deleted`,
    });
}