
import { Admin, CategoryInter } from "../interfaces/Admin";

export const adminLoginValid = (admin: Admin): string => {
  console.log(admin);

  if (!admin.adminId.trim()) {
    // toast.error("Please enter a username.");
    return "Please enter AdminID";
  }
  if (!admin.password.trim()) {
    return "Please enter password.";
  }
  return "success";

}



export const addCategoryValid = (data: CategoryInter): string => {
  if (!data.title.trim()) {
    return "Please enter Title of Category.";
  }

  if (!data.description.trim()) {
    return "Please enter description.";
  }
  return "success"
}