import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VscHistory } from "react-icons/vsc"

import { getUserEnrolledCourses } from "../../../../services/operations/profileAPI"
import Img from "../../../common/Img"

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [purchases, setPurchases] = useState(null) // null = loading

  useEffect(() => {
    ;(async () => {
      const res = await getUserEnrolledCourses(token)
      setPurchases(res || [])
    })()
  }, [])

  const sklRow = () => (
    <div className="flex items-center gap-x-4 border border-richblack-700 px-5 py-3">
      <div className="h-14 w-14 rounded-lg skeleton" />
      <div className="flex w-[50%] flex-col gap-2">
        <p className="h-2 w-[50%] rounded-xl skeleton" />
        <p className="h-2 w-[30%] rounded-xl skeleton" />
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="mb-8 text-4xl font-boogaloo text-richblack-5 text-center sm:text-left">
        Purchase History
      </h1>

      {purchases === null && (
        <div className="flex flex-col gap-2">
          {sklRow()}
          {sklRow()}
          {sklRow()}
        </div>
      )}

      {purchases?.length === 0 && (
        <div className="grid h-[50vh] w-full place-items-center text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-richblack-800 text-yellow-50">
              <VscHistory size={40} />
            </div>
            <p className="text-2xl font-semibold text-richblack-5">
              No purchases yet
            </p>
            <p className="max-w-sm text-richblack-300">
              Courses you buy will show up here with their price and details.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-2 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900"
            >
              Browse Courses
            </button>
          </div>
        </div>
      )}

      {purchases && purchases.length > 0 && (
        <div className="text-richblack-5">
          <div className="flex rounded-t-2xl bg-richblack-800">
            <p className="w-[55%] px-5 py-3">Course</p>
            <p className="flex-1 px-2 py-3">Price Paid</p>
          </div>
          {purchases.map((course, i, arr) => (
            <div
              key={course._id || i}
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-2xl" : ""
              }`}
            >
              <div
                className="flex w-[55%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => navigate(`/courses/${course._id}`)}
              >
                <Img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <p className="font-semibold">{course.courseName}</p>
              </div>
              <div className="flex-1 px-2 py-3">
                ₹{course.price ?? "N/A"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}