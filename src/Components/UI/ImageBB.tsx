export const ImageBB = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );

  const result = await res.json();

  if (!result.success) {
    throw new Error(result.error?.message || "Image upload failed");
  }

  return result.data.display_url;
};
