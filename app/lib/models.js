import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },

    balance: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isPartner: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

const requestSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
    },

    number: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    service: {
      type: String,
      default: false,
    },
    comments: {
      type: String,
      default: false,
    },
    oldBalance: {
      type: Number,
      required: true,
    },
    newBalance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);
// export const Product =
//   mongoose.models.Product || mongoose.model("Product", productSchema);
