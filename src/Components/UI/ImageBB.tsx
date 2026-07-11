export const ImageBB = async (file: File) => {

  const formData=new FormData()
  formData.append('image',file)

  const res = await fetch(
    `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_IMAGE_URL}`,
    {
      method: "POST",
       body: formData,
    }
  );
  if (!res.ok) {
    throw new Error("Image upload failed");
    }
 
  const result=await res.json();
  return result.data.display_url
};

export default ImageBB;
