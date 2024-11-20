import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name Required!"],
  },
  email: {
    type: String,
    required: [true, "Email Required!"],
  },
  phone: {
    type: String,
    required: [true, "Contact Noumber Required!"],
  },
  aboutMe: {
    type: String,
    required: [true, "About Me Field is Required!"],
  },
  password: {
    type: String,
    required: [true, "Password is Required!"],
    minLength: [8, "Password must contain al least characters!"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  portfolioURL: {
    type: String,
    required: [true, "Portfoilo URL is Required!"],
  },
  gitHubURL: String,
  instagramURL: String,
  facebookURL: String,
  twitterURL: String,
  linkedInURL: String,

  resetPasswordToken: String,

  resetPasswordExire: Date,
});

// for passwording hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// for comparing password with hased password
userSchema.methods.comparePassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

//Generating JSON Web Token
userSchema.methods.grnerateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.resetPasswordExire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export const User = mongoose.model("User", userSchema);
