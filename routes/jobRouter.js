import { Router } from "express";
const router = Router();

import {
    getAllJobs,
    createJob,
    getSingleJob,
    updateJob,
    deleteJob,
} from "../controllers/jobController.js";

import {
    validateJobInput,
    validateIdParam,
} from "../middlewares/validationMiddleware.js";

router.route("/")
    .get(getAllJobs)
    .post(validateJobInput, createJob);
router
    .route("/:id")
    .get(validateIdParam, getSingleJob)
    .patch(validateJobInput, validateIdParam, updateJob)
    .delete(validateIdParam, deleteJob);

export default router;
