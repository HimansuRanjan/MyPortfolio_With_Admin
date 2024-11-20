import mongoose from "mongoose";

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "PORTFOLIO",
    })
    .then(()=>{
        console.log("Connected to Database!!");
    })
    .catch((error)=>{
        console.log(`Some Error occued while connecting to Database: ${error}`);
    })
};

export default connectDatabase;