"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async (data: signInProps) => {
  const { email, password } = data;
  try {
    const { account } = await createAdminClient();
    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const signUp = async (data: SignUpParams) => {
  const { email, firstName, lastName, password } = data;
  try {
    // ** Create new user
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(), email!, password!, `${firstName}  ${lastName}`);

    const session = await account.createEmailPasswordSession(email!, password!);

    cookies().set("app-write-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export async function logout() {
  try {
    const { account } = await createSessionClient();
    cookies().delete("app-write-session");
    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
}
