import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Skill } from "../models/skillsSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const  addNewSkill = catchAsyncErrors(async(req, res, next) =>{
    const {title, proficiency } = req.body;

    if(!title || !proficiency){
        return next(new ErrorHandler("Title & Proficiency Required!", 400));
    }
    
    if (!req.files || Object.keys(req.files) === 0) {
        return next(new ErrorHandler("Skill Svg Required!", 400));
      }
      //Fetching Svg from request
      const { svg } = req.files;
    
      // Uploading Avatar to cloudnary
      const cloudinaryResponseSvg = await cloudinary.uploader.upload(
        svg.tempFilePath,
        { folder: "PORTOFOLIO_SKILLS_SVG" }
      );
    
      if (!cloudinaryResponseSvg || cloudinaryResponseSvg.error) {
        console.error(
          "Cloudinary Error",
          cloudinaryResponseSvg.error || "Unknown Cloudinary Error!"
        );
      }

    const skill = await Skill.create({
        title,
        proficiency,
        svg: {
            public_id: cloudinaryResponseSvg.public_id,
            url: cloudinaryResponseSvg.secure_url,
        }
    });

    res.status(200).json({
        success: true,
        message: "New Skill Added!",
        skill
    });
});

export const deleteSkill = catchAsyncErrors(async(req, res, next) =>{
    const {id} = req.params;
    const skill = await Skill.findById(id);
    if(!skill){
        return next(new ErrorHandler("Skill not Found!", 404));
    }
    
    await cloudinary.uploader.destroy(skill.svg.public_id);
    await skill.deleteOne();

    res.status(200).json({
        success: true,
        message: "Skill Deleted!"
    });
});

export const getAllSkills = catchAsyncErrors(async(req, res, next) =>{
    const skills = await Skill.find();
    res.status(200).json({
        success: true,
        message: "All Skills",
        skills
    });
});

export const updateSkill = catchAsyncErrors(async(req, res, next) =>{
    const { id } = req.params;
    let skill = await Skill.findById(id);
    if(!skill){
        return next(new ErrorHandler("Skill not Found!", 404));
    }
    const {proficiency} = req.body;
    
    skill = await Skill.findByIdAndUpdate(id, {proficiency}, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        message: "Skill Updated!",
        skill,
      });
});