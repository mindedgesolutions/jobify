import { Router } from "express";
const router = Router();

import {
    getCurrentUser,
    getApplicationStats,
    updateUser
} from "../controllers/userController.js";

import {
    validateUpdateUserInput
} from "../middlewares/validationMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
import { authorizePermissions } from "../middlewares/authMiddleware.js";

router.get('/info', getCurrentUser);
router.get('/admin/stats', [authorizePermissions('admin'), getApplicationStats]);
router.patch('/info/update', upload.single('avatar'), validateUpdateUserInput, updateUser);

export default router;