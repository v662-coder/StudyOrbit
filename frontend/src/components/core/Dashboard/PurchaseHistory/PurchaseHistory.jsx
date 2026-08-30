import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VscHistory } from "react-icons/vsc"

// BUGFIX: previously reused getUserEnrolledCourses, which only has course
// name/thumbnail/price - no real transaction data. Now backed by a real
// Order record per purchase (see backend/models/order.js), so this shows
// the amount actually paid, the Razorpay payment ID, and the real date.
import { getPaymentHistory } from "../../../../services/operations/studentFeaturesAPI"
import Img from "../../../common/Img"

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [orders, setOrders] = useState(null) // null = loading

  useEffect(() => {
    ;(async () => {
      const res = await getPaymentHistory(token)
      setOrders(res || [])
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

      {/* Loading skeleton */}
      {orders === null && (
        <div className="flex flex-col gap-2">
          {sklRow()}
          {sklRow()}
          {sklRow()}
        </div>
      )}

      {/* Decorated empty state */}
      {orders?.length === 0 && (
        <div className="grid h-[50vh] w-full place-items-center text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-richblack-800 text-yellow-50">
              <VscHistory size={40} />
            </div>
            <p className="text-2xl font-semibold text-richblack-5">
              No purchases yet
            </p>
            <p className="max-w-sm text-richblack-300">
              Courses you buy will show up here with their price and payment details.
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

      {/* Purchase list */}
      {orders && orders.length > 0 && (
        <div className="text-richblack-5">
          <div className="flex rounded-t-2xl bg-richblack-800">
            <p className="w-[40%] px-5 py-3">Course</p>
            <p className="w-[15%] px-2 py-3">Amount</p>
            <p className="w-[25%] px-2 py-3">Payment ID</p>
            <p className="flex-1 px-2 py-3">Date</p>
          </div>
          {orders.map((order, i, arr) => (
            <div
              key={order._id || i}
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-2xl" : ""
              }`}
            >
              <div
                className="flex w-[40%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() =>
                  order.course?._id && navigate(`/courses/${order.course._id}`)
                }
              >
                <Img
                  src={order.course?.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <p className="font-semibold">
                  {order.course?.courseName || "Course removed"}
                </p>
              </div>
              <div className="w-[15%] px-2 py-3">₹{order.amount}</div>
              <div className="w-[25%] px-2 py-3 text-xs text-richblack-300 break-all">
                {order.razorpayPaymentId}
              </div>
              <div className="flex-1 px-2 py-3 text-sm">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}