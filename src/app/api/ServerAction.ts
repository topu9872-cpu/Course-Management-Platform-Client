import { getData, postData } from "./ServerMutation";

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

export const getHomeCoursesData = async () => {
  return getData("/home-courses-data");
};

export const getDetailsData = async (id: Number) => {
  return getData(`/courses/${id}`);
};
type EmailInfo = {
  email: string;
  name: string;
};

export const emailPost = async (data: EmailInfo) => {
  return postData("/send-email", data);
};
export const Subcribeing = async (data: EmailInfo) => {
  return postData("/subcribe", data);
};
