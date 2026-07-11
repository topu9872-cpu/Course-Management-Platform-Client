import { getData } from "./ServerMutation";

export const getCoursesData = async (query: {
  page?: string;
  search?: string;
  category?: string;
  price?: string;
  rating?: string;
}) => {
  const params = new URLSearchParams();

  if (query.page) params.set("page", query.page);
  if (query.search) params.set("search", query.search);
  if (query.category) params.set("category", query.category);
  if (query.price) params.set("price", query.price);
  if (query.rating) params.set("rating", query.rating);

  return getData("/courses", params.toString());
};

export const getHomeCoursesData=async()=>{
  return getData('/home-courses-data')
}