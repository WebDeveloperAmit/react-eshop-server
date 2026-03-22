import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (v) => validator.isMobilePhone(v, "en-IN"),
        message: "Invalid mobile number",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // hide by default
    },

    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password is new or modified

  try {
    const salt = await bcrypt.genSalt(10); // generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // hash the password
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // compare entered password with hashed password
};

export default mongoose.model("User", userSchema);
