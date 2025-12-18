const BASE_URL = "https://studyorbit.onrender.com";
// const BASE_URL = "http://localhost:5000";

/* ================= AUTH ================= */
export const endpoints = {
  SENDOTP_API: BASE_URL + "/api/v1/auth/sendotp",
  SIGNUP_API: BASE_URL + "/api/v1/auth/signup",
  LOGIN_API: BASE_URL + "/api/v1/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/api/v1/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/api/v1/auth/reset-password",
};

/* ================= PROFILE ================= */
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/api/v1/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API:
    BASE_URL + "/api/v1/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API:
    BASE_URL + "/api/v1/profile/instructorDashboard",
};

/* ================= STUDENT / PAYMENT ================= */
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/api/v1/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/api/v1/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API:
    BASE_URL + "/api/v1/payment/sendPaymentSuccessEmail",
};

/* ================= COURSES ================= */
export const courseEndpoints = {
  GET_ALL_COURSE_API:
    BASE_URL + "/api/v1/course/getAllCourses",

  COURSE_DETAILS_API:
    BASE_URL + "/api/v1/course/getCourseDetails",

  CREATE_COURSE_API:
    BASE_URL + "/api/v1/course/createCourse",

  EDIT_COURSE_API:
    BASE_URL + "/api/v1/course/editCourse",

  GET_ALL_INSTRUCTOR_COURSES_API:
    BASE_URL + "/api/v1/course/getInstructorCourses",

  DELETE_COURSE_API:
    BASE_URL + "/api/v1/course/deleteCourse",

  /* ---------- CATEGORY ---------- */
  COURSE_CATEGORIES_API:
    BASE_URL + "/api/v1/course/showAllCategories",

  /* ---------- SECTIONS ---------- */
  CREATE_SECTION_API:
    BASE_URL + "/api/v1/course/addSection",

  UPDATE_SECTION_API:
    BASE_URL + "/api/v1/course/updateSection",

  DELETE_SECTION_API:
    BASE_URL + "/api/v1/course/deleteSection",

  /* ---------- SUB-SECTIONS ---------- */
  CREATE_SUBSECTION_API:
    BASE_URL + "/api/v1/course/addSubSection",

  UPDATE_SUBSECTION_API:
    BASE_URL + "/api/v1/course/updateSubSection",

  DELETE_SUBSECTION_API:
    BASE_URL + "/api/v1/course/deleteSubSection",

  /* ---------- OTHERS ---------- */
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/api/v1/course/getFullCourseDetails",

  LECTURE_COMPLETION_API:
    BASE_URL + "/api/v1/course/updateCourseProgress",

  CREATE_RATING_API:
    BASE_URL + "/api/v1/course/createRating",
};

/* ================= RATINGS ================= */
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API:
    BASE_URL + "/api/v1/course/getReviews",
};

/* ================= CATEGORIES (OPTIONAL ALIAS) ================= */
export const categories = {
  COURSE_CATEGORIES_API:
    BASE_URL + "/api/v1/course/showAllCategories",
};

/* ================= CATALOG ================= */
export const catalogData = {
  CATALOGPAGEDATA_API:
    BASE_URL + "/api/v1/course/getCategoryPageDetails",
};

/* ================= CONTACT ================= */
export const contactusEndpoint = {
  CONTACT_US_API:
    BASE_URL + "/api/v1/reach/contact",
};

/* ================= SETTINGS ================= */
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API:
    BASE_URL + "/api/v1/profile/updateUserProfileImage",

  UPDATE_PROFILE_API:
    BASE_URL + "/api/v1/profile/updateProfile",

  CHANGE_PASSWORD_API:
    BASE_URL + "/api/v1/auth/changepassword",

  DELETE_PROFILE_API:
    BASE_URL + "/api/v1/profile/deleteProfile",
};
