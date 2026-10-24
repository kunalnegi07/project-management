import { body } from "express-validator";
import { AvailableUserRoles } from "../utils/constants.js";

const userRegisterValidator = () => {
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
        body("username")
        .trim()
        .notEmpty()
        .withMessage("username is required")
        .isLowercase()
        .withMessage("username must be in lowercase")
        .isLength({min : 3})
        .withMessage("minimum 3 characters"),
        body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
        body("fullName")
        .optional()
        .trim(),

    ]
}

const userLoginValidator = () => {
    return [
       body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
        body("password")
        .notEmpty()
        .withMessage("password is required")
    ]
}

const userChangeCurrentPasswordValidator = () =>{
    return [
        body("oldPassword")
        .notEmpty()
        .withMessage("old password is required"),
        body("newPassword")
        .notEmpty()
        .withMessage("new password is required")
    ]
}

const userForgotPasswordValidator = () =>{
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email should be valid ")
    ]
}

const userResetForgotPasswordValidator = ()=>{
    return [
        body("newPassword")
        .notEmpty()
        .withMessage("password is required")
    ]
}

const createProjectValidator = ()=>{
    return [
        body("name")
        .notEmpty()
        .withMessage("name is required"),
        body("description").optional(),
    ]
}

const addMembersToProjectValidator = ()=>{
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("email is invalid"),
        body("role")
        .notEmpty()
        .withMessage("role is required")
        .isIn(AvailableUserRoles)
        .withMessage("Role is invalid")
        ,

    ]
}

export {
    userRegisterValidator,
    userLoginValidator,
    userChangeCurrentPasswordValidator,
    userForgotPasswordValidator,
    userResetForgotPasswordValidator,
    addMembersToProjectValidator,
}