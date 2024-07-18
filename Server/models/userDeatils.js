const mongoose = require("mongoose");

const userDetailsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email:{
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", 
    },
  },
  {
    timestamps: true,
  }
);

const UserData = mongoose.model("UserData", userDetailsSchema);

module.exports = UserData;
