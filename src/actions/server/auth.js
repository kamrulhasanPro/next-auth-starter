"use server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";

export async function registerUser(payload) {
  // users connection
  const usersCollection = await dbConnect("users");

  // 1 - check exit user
  const isExist = await usersCollection.findOne({ email: payload.email });
  if (isExist) {
    return {
      success: false,
      message: "already exiting user",
    };
  }

  // 2 - bcrypt password
  const hashPassword = await bcrypt.hash(payload.password, 10);

  // 3 - create user
  const newUser = {
    ...payload,
    createdAt: new Date().toISOString(),
    role: "user",
    password: hashPassword,
  };

  // 4 - pass user in database
  const result = await usersCollection.insertOne(newUser);

  if (result.acknowledged) {
    return {
      success: true,
      message: `Successfully created user on ${result.insertedId}`
    };
  }

}
