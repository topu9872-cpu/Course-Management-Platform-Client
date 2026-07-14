import { deleteData, getData, postData, updateData } from "./ServerMutation";

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

export const CoursesPost = async (data: any) => {
  return postData("/courses", data);
};

export const getInstructorData = async (id: String) => {
  return getData(`/courses/instructor/${id}`);
};
export const updateInstructorData = async (id: String, data: any) => {
  return updateData(`/courses/instructor/${id}`, data);
};

export const deleteInstructorData = async (id: String) => {
  return deleteData(`/courses/instructor/${id}`);
};
export const deleteStudent = async (id: string) => {
  return deleteData(`/instructor-students/${id}`);
};

export const getEnrollmentPrice = async (id: String) => {
  return getData(`/student-enroll/${id}`);
};
export const getEnrollmentData = async (
  studentId: string,
  courseId: string,
) => {
  return getData(
    "/enrollment-data",
    `studentId=${studentId}&courseId=${courseId}`,
  );
};

export const updateEnrollmentPost = async (id: String, data: any) => {
  return postData(`/student-enroll/${id}`, data);
};

export const getInstructorsStudents = async (
  instructorId: string,
  search = "",
) => {
  return getData(
    `/instructor-students/${instructorId}`,
    `search=${encodeURIComponent(search)}`,
  );
};


export const getStudentsCourses=async(id:string)=>{
  return getData(`/student-courses/${id}`)
}

export const getAllUsers=async()=>{
  return getData('/users')
}

export const getUserBlock=async(id:string,isBlock:boolean)=>{
  return updateData(`/users/${id}`,{isBlock})
}
export const deleteUser=async(id:string)=>{
  return deleteData(`/users/${id}`)
}
export const getAllEnrollment=async()=>{
  return getData('/all-users')
}

export const deleteEnrollmentAdmin=async(id:string)=>{
  return deleteData(`/all-users/${id}`)
}
