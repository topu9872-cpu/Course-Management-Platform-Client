const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const getData = async (path: string, query: string = "") => {
  const res = await fetch(`${BASE_URL}${path}?${query}`);
  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
};

export const postData = async (path: string, data: any) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to fetch post data");

  return res.json();
};


export const updateData = async (path: string, data: any) => {
 
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to fetch post data");

  return res.json();
};


export const deleteData = async (path: string) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to fetch post data");
  return res.json();
};
