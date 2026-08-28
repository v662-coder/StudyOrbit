import React from "react"

const Terms = () => {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent py-16 text-richblack-5">
      <h1 className="mb-2 text-4xl font-semibold">Terms of Service</h1>
      <p className="mb-8 text-sm text-richblack-400">Last updated: 2026</p>

      <div className="flex max-w-3xl flex-col gap-6 text-richblack-300">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            1. Using StudyOrbit
          </h2>
          <p>
            By creating an account and using StudyOrbit, you agree to
            provide accurate information and to use the platform only for
            lawful purposes.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            2. Courses and content
          </h2>
          <p>
            Course content is created by instructors on the platform.
            Purchasing a course grants you access to that course's content
            for learning purposes only — redistribution or resale of course
            content is not permitted.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            3. Payments
          </h2>
          <p>
            All course purchases are processed securely through our payment
            provider. Prices are shown before checkout, and access is
            granted immediately after a successful payment.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            4. Instructor responsibilities
          </h2>
          <p>
            Instructors are responsible for the accuracy and quality of the
            content they publish. StudyOrbit reserves the right to remove
            content that violates these terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            5. Changes to these terms
          </h2>
          <p>
            We may update these Terms from time to time. Continued use of
            the platform after changes means you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            6. Contact us
          </h2>
          <p>
            Questions about these Terms? Reach out via our{" "}
            <a href="/contact" className="text-yellow-50 hover:underline">
              Contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

export default Terms