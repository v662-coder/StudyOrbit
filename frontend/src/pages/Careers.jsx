import React from "react"

const Careers = () => {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent py-16 text-richblack-5">
      <h1 className="mb-4 text-4xl font-semibold">Careers at StudyOrbit</h1>
      <p className="max-w-3xl text-richblack-300">
        We're building a platform that helps students learn and instructors
        teach, at scale. We don't have any open positions listed right now,
        but we're always happy to hear from people who care about education.
      </p>

      <div className="mt-10 max-w-3xl rounded-xl border border-richblack-700 bg-richblack-800 p-6">
        <h2 className="mb-2 text-xl font-semibold text-richblack-5">
          Interested in working with us?
        </h2>
        <p className="text-richblack-300">
          Reach out via our{" "}
          <a href="/contact" className="text-yellow-50 hover:underline">
            Contact page
          </a>{" "}
          and tell us a bit about yourself — we review every message.
        </p>
      </div>
    </div>
  )
}

export default Careers