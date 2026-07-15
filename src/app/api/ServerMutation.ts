import { userSession } from "@/lib/user";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

const userToken=async()=>{
 const user=await userSession()
 return user?.session?.token

}


export const getData = async (path: string, query: string = "") => {
  const url = `${BASE_URL}${path}${query ? `?${query}` : ""}`;
const token=await userToken()
  const res = await fetch(url,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  if (!res.ok) {
    const error = await res.text();
    console.log("Error:", error);
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

  return res.json();
};

export const postData = async (path: string, data: any) => {
  const token=await userToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       Authorization:`Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to fetch post data");

  return res.json();
};

export const updateData = async (path: string, data: any) => {
const token=await userToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
       Authorization:`Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to fetch post data");

  return res.json();
};

export const deleteData = async (path: string) => {
  const token=await userToken()
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers:{
       Authorization:`Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Failed to fetch post data");
  return res.json();
};
