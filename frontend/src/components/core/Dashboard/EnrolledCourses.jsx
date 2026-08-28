import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VscMortarBoard } from "react-icons/vsc"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import Img from './../../common/Img';



export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  // fetch all users enrolled courses
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [])

  // Loading Skeleton
  const sklItem = () => {
    return (
      <div className="flex border border-richblack-700 px-5 py-3 w-full">
        <div className="flex flex-1 gap-x-4 ">
          <div className='h-14 w-14 rounded-lg skeleton '></div>

          <div className="flex flex-col w-[40%] ">
            <p className="h-2 w-[50%] rounded-xl  skeleton"></p>
            <p className="h-2 w-[70%] rounded-xl mt-3 skeleton"></p>
          </div>
        </div>

        <div className="flex flex-[0.4] flex-col ">
          <p className="h-2 w-[20%] rounded-xl skeleton mt-2"></p>
          <p className="h-2 w-[40%] rounded-xl skeleton mt-3"></p>
        </div>
      </div>
    )
  }

  if (enrolledCourses?.length == 0) {
    return (
      <div className="grid h-[50vh] w-full place-items-center text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-richblack-800 text-yellow-50">
            <VscMortarBoard size={40} />
          </div>
          <p className="text-2xl font-semibold text-richblack-5">
            You have not enrolled in any course yet.
          </p>
          <p className="max-w-sm text-richblack-300">
            Browse our courses and start learning something new today.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900"
          >
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="text-4xl text-richblack-5 font-boogaloo text-center sm:text-left">Enrolled Courses</div>
      {
        <div className="my-8 text-richblack-5">
          <div className="flex rounded-t-2xl bg-richblack-800 ">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          {!enrolledCourses && <div >
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
            {sklItem()}
          </div>}

          {
            enrolledCourses?.map((course, i, arr) => (
              <div
                className={`flex flex-col sm:flex-row sm:items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-2xl" : "rounded-none"}`}
                key={i}
              >
                <div
                  className="flex sm:w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <Img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />

                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>

                <div className='sm:hidden'>
                  <div className=" px-2 py-3">{course?.totalDuration}</div>

                  <div className="flex sm:w-2/5 flex-col gap-2 px-2 py-3">
                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    />
                  </div>
                </div>

                <div className="hidden w-1/5 sm:flex px-2 py-3">{course?.totalDuration}</div>
                <div className="hidden sm:flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))
          }
        </div>
      }
    </>
  )
}