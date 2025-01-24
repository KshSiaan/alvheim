import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    profile_picture: {
      type: Number, // URL or path to image
      default: 0,
    },
    bio: {
      type: String,
      maxlength: 500, // Max length for bio
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "banned", "admin"],
      default: "user",
    },
    is_active: {
      type: Boolean,
      default: true, // Whether account is active or deactivated
    },
    last_login: {
      type: Date,
    },
    followers_count: {
      type: Number,
      default: 0,
    },
    following_count: {
      type: Number,
      default: 0,
    },
    posts_count: {
      type: Number,
      default: 0,
    },
    is_private: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

userSchema.pre("save", async function (next: (err?: Error) => void) {
  if (this.isModified("password") || this.isNew) {
    try {
      const saltRounds = 10; // Salt rounds for bcrypt
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next(); // Proceed without error
    } catch (error) {
      console.error("Error hashing password:", error);
      next(error as Error); // Pass the error explicitly
    }
  } else {
    next(); // No changes to the password, proceed without error
  }
});
// Create User Model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
