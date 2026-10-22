import { User} from "../model/user.model.js"
import { Project } from "../model/project.models.js"
import {ProjectMember } from "../model/projectmember.models.js"

import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import mongoose from "mongoose";

const getProjects = asyncHandler (async(req,res)=>{
    const projects = await ProjectMember.aggregate(
       [
        {
            $match : {
                user : new mongoose.Types.ObjectId(req.user._id)
            },
        },
        {
            $lookup : {
                from : "projects",
                localField : "projects",
                foreignField : "_id",
                as: "projects",
                pipeline : [{
                    $lookup :{
                        from : "projectmembers",
                        localField : "_id",
                        foreignField :"projects",
                        as : "projectmembers"
                    }
                  },
                  {
                    $addFiels : {
                        members :{
                            $size: "$projectmembers"
                        }
                    }
                  },
                  {
                    $unwind: "$project"
                  },
                  {
                    $project:{
                        project:{
                            _id: 1,
                            name: 1,
                            description : 1,
                            members: 1,
                            createdAt: 1,
                            createdBy : 1,
                        },
                        role : 1,
                        _id : 0
                    }
                  }
                ]
            }
        }
       ]
    )

    return res.status(200).json(new ApiResponse(200,projects,"projects fetched successfully"))
})

const getProjectById = asyncHandler (async(req,res)=>{
    //test
})

const createProject = asyncHandler (async(req,res)=>{
    const {name , description} = req.body

    const project = await Project.create({
        name,
        description,
        createdBy : new mongoose.Types.ObjectId(req.user._id)
    })

    await ProjectMember.create({
        user : new mongoose.Types.ObjectId(req.user._id),
        project : new mongoose.Types.ObjectId(project._id),
        role : UserRolesEnum.ADMIN
    })

    return res
            .status(201)
            .json(new ApiResponse(201,{},"New project created"))
})

const updateProject = asyncHandler(async(req,res)=>{
    const {name,description} = req.body
    const {projectId} = req.params

    const project = await Project.findByIdAndUpdate(projectId,{
        name,
        description
    },
    {new : true})

    if(!project){
        throw new ApiError(404,"Project not found")
    }

    return res
            .status(200)
            .json(new ApiResponse(200,project,"Project updated successfully"))
})

const deleteProject = asyncHandler(async(req,res)=>{
    const {projectId} = req.params
    const project = await Project.findByIdAndDelete(projectId)
    if(!project){
        throw new ApiError(404,"Project not found")
    }
    return res
            .status(200)
            .json(200,{},"Project deleted successfully")
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
    getProjects,
    createProject,
}

