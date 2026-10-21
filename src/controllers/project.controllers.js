import { User} from "../model/user.model.js"
import { Project } from "../model/project.models.js"
import {ProjectMember } from "../model/projectmember.models.js"

import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";

const getProject = asyncHandler (async(req,res)=>{
    //test
})

const getProjectById = asyncHandler (async(req,res)=>{
    //test
})

const createProject = asyncHandler (async(req,res)=>{
    //test
})

const updateProject = asyncHandler(async(req,res)=>{
    //test
})

const deleteProject = asyncHandler(async(req,res)=>{
    //test
})

const addMembersToProject = asyncHandler(async(req,res)=>{
    //test
})

const getProjectMembers = asyncHandler(async(req,res)=>{
    //test
})

const updateMemberRole = asyncHandler(async(req,res)=>{
    //test
})

const deleteMember = asyncHandler(async(req,res)=>{
    //test
})

export{
    addMembersToProject,
    getProjectById,
    getProjectMembers,
    updateMemberRole,
    deleteMember,
    updateProject,
    deleteProject,
    getProject,
    createProject,
}

