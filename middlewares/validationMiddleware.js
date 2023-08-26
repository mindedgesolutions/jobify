import { body, param, validationResult } from "express-validator";
import { BadRequestError, UnauthenticatedError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import jobModel from "../models/jobModel.js";
import userModel from "../models/userModel.js";
import { NotFoundError } from "../errors/customErrors.js";

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                const errorMessages = errors.array().map((error) => {
                    return error.msg;
                });
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

export const validateJobInput = withValidationErrors([
    body("company").notEmpty().withMessage("Company name is required"),
    body("position").notEmpty().withMessage("Position is required"),
    body("location").notEmpty().withMessage("Your location is require"),
    body("jobStatus")
        .isIn(Object.values(JOB_STATUS))
        .withMessage("Invalid status value"),
    body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("Invalid job type"),
]);

export const validateIdParam = withValidationErrors([
    param("id").custom(async (value, { req }) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new BadRequestError(`ID doesn't exist`);
        const job = await jobModel.findById(value);

        if (!job) throw new NotFoundError(`No job found with ID ${value}`);
        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userId === job.createdBy.toString()
        console.log(req.user.userId)
        if (!isAdmin && !isOwner) throw new UnauthenticatedError('Not authorized to access')
    }),
]);

export const validateRegisterInput = withValidationErrors([
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Not a valid email")
        .custom(async (email) => {
            const user = await userModel.findOne({ email });
            if (user) {
                throw new BadRequestError("Email is in use");
            }
        }),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8, max: 10 })
        .withMessage("Password must be between 8 to 10 characters"),
    body("location").notEmpty().withMessage("Location is required"),
]);

export const validateLoginInput = withValidationErrors([
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Not a valid email"),
    body("password")
        .notEmpty()
        .withMessage("Password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Not a valid email")
        .custom(async (email, { req }) => {
            const user = await userModel.findOne({ email });
            if (user && user._id.toString() !== req.user.userId) {
                throw new BadRequestError("Email is in use");
            }
        }),
    body("location").notEmpty().withMessage("Location is required"),
]);