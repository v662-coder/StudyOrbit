import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"
import { LOADING_TOAST_ID } from "../../utils/toastId"

const { COURSE_CATEGORIES_API, CREATE_CATEGORY_API, UPDATE_CATEGORY_API } =
  courseEndpoints

// ================ get all categories ================
export const getAllCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API)
    if (!response?.data?.success) {
      throw new Error("Could not fetch categories")
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_ALL_CATEGORIES API ERROR....", error)
    toast.error("Could not fetch categories")
  }
  return result
}

// ================ create a new category (Admin only) ================
export const createCategory = async (data, token) => {
  const toastId = toast.loading("Creating category...", { id: LOADING_TOAST_ID })
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not create category")
    }
    toast.success("Category created")
    success = true
  } catch (error) {
    console.log("CREATE_CATEGORY API ERROR....", error)
    toast.error(error.response?.data?.message || "Could not create category")
  }
  toast.dismiss(toastId)
  return success
}

// ================ update an existing category (Admin only) ================
export const updateCategory = async (data, token) => {
  const toastId = toast.loading("Updating category...", { id: LOADING_TOAST_ID })
  let success = false
  try {
    const response = await apiConnector("PUT", UPDATE_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not update category")
    }
    toast.success("Category updated")
    success = true
  } catch (error) {
    console.log("UPDATE_CATEGORY API ERROR....", error)
    toast.error(error.response?.data?.message || "Could not update category")
  }
  toast.dismiss(toastId)
  return success
}