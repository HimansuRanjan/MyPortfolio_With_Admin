import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { SoftwareApp } from "../models/softwareAppSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewApplication = catchAsyncErrors(async(req, res, next) =>{
    const {name} = req.body;

    if(!name){
        return next(new ErrorHandler("Software Name Required!", 400));
    }
    
    if (!req.files || Object.keys(req.files) === 0) {
        return next(new ErrorHandler("Software Application Icon/Svg Required!", 400));
      }
      //Fetching Svg from request
      const { svg } = req.files;
    
      // Uploading Avatar to cloudnary
      const cloudinaryResponseSvg = await cloudinary.uploader.upload(
        svg.tempFilePath,
        { folder: "PORTOFOLIO_SOFTWARE_APPLICATIONS" }
      );
    
      if (!cloudinaryResponseSvg || cloudinaryResponseSvg.error) {
        console.error(
          "Cloudinary Error",
          cloudinaryResponseSvg.error || "Unknown Cloudinary Error!"
        );
      }

    const softwareApp = await SoftwareApp.create({
        name,
        svg: {
            public_id: cloudinaryResponseSvg.public_id,
            url: cloudinaryResponseSvg.secure_url,
        }
    });

    res.status(200).json({
        success: true,
        message: "New Soft. Application Added!",
        softwareApp
    });
});

export const deleteApplication = catchAsyncErrors(async(req, res, next) =>{
    const {id} = req.params;
    const softwareApp = await SoftwareApp.findById(id);
    if(!softwareApp){
        return next(new ErrorHandler("Application not Found!", 404));
    }
    
    await cloudinary.uploader.destroy(softwareApp.svg.public_id);
    await softwareApp.deleteOne();

    res.status(200).json({
        success: true,
        message: "Application Deleted!"
    });
});

export const getAllApplications = catchAsyncErrors(async(req, res, next) =>{
    const softwareApps = await SoftwareApp.find();
    res.status(200).json({
        success: true,
        message: "All Applications",
        softwareApps
    });
});