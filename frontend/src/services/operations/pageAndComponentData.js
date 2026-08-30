import React from 'react'
import { toast } from "react-hot-toast"
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';
import { LOADING_TOAST_ID } from "../../utils/toastId"


// ================ get Catalog Page Data  ================
export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...", { id: LOADING_TOAST_ID });
  let result = [];
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId, });

    if (!response?.data?.success)
      throw new Error("Could not Fetch Category page data");

    result = response?.data?.data;

  }
  catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    // BUGFIX: the toast error call was commented out (along with the
    // toast.loading above), so a failed category fetch showed absolutely no
    // feedback to the user - just a silent blank page, which is exactly the
    // "empty state / fallback error" behavior being reported.
    toast.error(error.response?.data?.message || "Could not fetch category data");
    result = error.response?.data?.data;
  }
  toast.dismiss(toastId);
  return result;
}

