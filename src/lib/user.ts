'use server'
import { headers } from "next/headers";
import { auth } from "./auth";

export const userDet = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};


export const userSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};
