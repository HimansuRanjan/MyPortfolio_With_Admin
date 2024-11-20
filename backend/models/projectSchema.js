import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Project title is required!"]
    },
    description: {
        type: String,
        required: [true, "Project description is required!"]
    },
    gitRepoLink: String,
    projectLink: String,
    technologies: String,
    stack: String,
    deployed: String,
    projectBanner: {
        public_id: {
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true 
        }
    }
});

export const Project = mongoose.model("Project", projectSchema);
