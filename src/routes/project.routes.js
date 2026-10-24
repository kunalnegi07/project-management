import { Router } from "express";
import {
    addMembersToProject,
    getProjectById,
    getProjectMembers,
    updateMemberRole,
    deleteMember,
    updateProject,
    deleteProject,
    getProjects,
    createProject,
    } from "../controllers/project.controllers.js";
import { verifyJWT,validateProjectPermission } from "../middlewares/auth.middleware.js";
import { createProjectValidator,addMembersToProjectValidator } from "../validators/index.js";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = Router()

router.use(verifyJWT)

router
    .route("/")
    .get(getProjects)
    .post(createProjectValidator(),validate,createProject)

router
    .route("/:projectId")
    .get(validateProjectPermission(AvailableUserRoles),getProjectById)
    .put(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        createProjectValidator(),
        validate,
        updateProject
    )
    .delete(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        deleteProject
    )

router
    .route("/:projectId/members")
    .get(getProjectMembers)
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        addMembersToProjectValidator(),
        validate,
        addMembersToProject
    )

router
    .route("/:projectId/members/:userId")
    .put(validateProjectPermission([UserRolesEnum.ADMIN]),updateMemberRole)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]),
    deleteMember)
    

export default router