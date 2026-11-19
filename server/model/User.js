import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    isActive: {
      type: Boolean,
      default: true
    },

    refreshTokenHash: {
      type: String,
      select: false
    },

    passwordResetTokenHash: {
      type: String,
      select: false
    },

    passwordResetExpires: {
      type: Date,
      select: false
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;