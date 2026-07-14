const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const getData = async (path: string, query: string = "") => {
  const url = `${BASE_URL}${path}${query ? `?${query}` : ""}`;

  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.text();
    console.log("Error:", error);
    throw new Error(`Failed to fetch data: ${res.status}`);
  }

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
console.log(path, data)
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
