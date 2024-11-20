import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Image Required!", 400));
  }
  const { projectBanner } = req.files;
  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed
  } = req.body;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !technologies ||
    !stack ||
    !deployed
  ) {
    return next(new ErrorHandler("Please Provide All Details", 400));
  }

  // Uploading Avatar to cloudnary
  const cloudinaryResponseProjBanner = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "PORTOFOLIO_PROJECT_BANNER" }
  );

  if (!cloudinaryResponseProjBanner || cloudinaryResponseProjBanner.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryResponseProjBanner.error || "Unknown Cloudinary Error!"
    );
    return next(new ErrorHandler("Failed to upload Project Banner to Portfolio!", 400));
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    technologies,
    stack,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponseProjBanner.public_id,
      url: cloudinaryResponseProjBanner.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Project Added!",
    project
  });
});

export const updateProject = catchAsyncErrors(async (req, res, next) => {
    const newProjectData = {
        title: req.body.title,
        description: req.body.description,
        gitRepoLink: req.body.gitRepoLink,
        projectLink: req.body.projectLink,
        technologies: req.body.technologies,
        stack: req.body.stack,
        deployed: req.body.deployed
      };

    const {id} = req.params;

    if (req.files && req.files.projectBanner) {
        const projectBanner = req.files.projectBanner;
        const project = await Project.findById(id);    
        await cloudinary.uploader.destroy(project.projectBanner.public_id);
        // Re-Uploading Resume to cloudnary
        const cloudinaryResponsePrjBanner = await cloudinary.uploader.upload(
          projectBanner.tempFilePath,
          { folder: "PORTOFOLIO_PROJECT_BANNER" }
        );
        newProjectData.projectBanner = {
          public_id: cloudinaryResponsePrjBanner.public_id,
          url: cloudinaryResponsePrjBanner.secure_url,
        };
      }

      const project = await Project.findByIdAndUpdate(id, newProjectData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        message: "Project Data Updated!",
        project,
      });
});


export const deleteProject = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("Project not Found!", 404));
    }
    
    await cloudinary.uploader.destroy(project.projectBanner.public_id);
    await project.deleteOne();

    res.status(200).json({
        success: true,
        message: "Project Deleted!"
    });
});



export const getAllprojects = catchAsyncErrors(async (req, res, next) => {
    const projects = await Project.find();
    res.status(200).json({
        success: true,
        message: "All Projects",
        projects
    });
});

export const getSingleProject = catchAsyncErrors(async (req, res, next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("Project not Found!", 404));
    }
    res.status(200).json({
        success: true,
        message: "Project",
        project
    });
});
