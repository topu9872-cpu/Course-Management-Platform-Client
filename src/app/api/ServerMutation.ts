const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const getData = async (
  path: string,
  query: string = ""
) => {
    console.log(path)
  const res = await fetch(`${BASE_URL}${path}${query}`);
  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
};