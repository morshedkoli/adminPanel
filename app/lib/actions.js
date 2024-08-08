"use server";

import { revalidatePath } from "next/cache";
import { User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { fetchUser } from "@/app/lib/data";

export const addUser = async (formData) => {
  const {
    username,
    balance,
    email,
    password,
    phone,
    address,
    isPartner,
    isActive,
  } = Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newBalance = parseInt(balance);

    const newUser = new User({
      username,
      balance: newBalance,
      email,
      password: hashedPassword,
      phone,
      address,
      isPartner,
      isActive,
      isAdmin: false,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const {
    id,
    username,
    balance,
    email,
    password,
    phone,
    address,
    isPartner,
    isActive,
  } = Object.fromEntries(formData);

  try {
    connectToDB();
    const user = await fetchUser(id);
    const newBalance = parseInt(user.balance) + parseInt(balance);

    const updateFields = {
      username,
      balance: newBalance || balance,
      email,
      password,
      phone,
      address,
      isPartner,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
