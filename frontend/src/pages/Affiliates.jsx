import React from "react"

const Affiliates = () => {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent py-16 text-richblack-5">
      <h1 className="mb-4 text-4xl font-semibold">Affiliate Program</h1>
      <p className="max-w-3xl text-richblack-300">
        Love StudyOrbit and want to share it with your audience? Our
        affiliate program lets creators, educators, and community leaders
        earn a commission for every student they refer who enrolls in a
        course.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
          <h3 className="mb-2 font-semibold text-richblack-5">1. Sign up</h3>
          <p className="text-sm text-richblack-300">
            Reach out through our Contact page to join the program.
          </p>
        </div>
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
          <h3 className="mb-2 font-semibold text-richblack-5">2. Share</h3>
          <p className="text-sm text-richblack-300">
            Share your unique link with your audience.
          </p>
        </div>
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-6">
          <h3 className="mb-2 font-semibold text-richblack-5">3. Earn</h3>
          <p className="text-sm text-richblack-300">
            Get a commission for every enrollment through your link.
          </p>
        </div>
      </div>

      <p className="mt-10 max-w-3xl text-richblack-300">
        Interested?{" "}
        <a href="/contact" className="text-yellow-50 hover:underline">
          Get in touch with us
        </a>{" "}
        to learn more.
      </p>
    </div>
  )
}

export default Affiliates