import React from "react"

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent py-16 text-richblack-5">
      <h1 className="mb-2 text-4xl font-semibold">Privacy Policy</h1>
      <p className="mb-8 text-sm text-richblack-400">Last updated: 2026</p>

      <div className="flex max-w-3xl flex-col gap-6 text-richblack-300">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            1. Information we collect
          </h2>
          <p>
            When you create an account on StudyOrbit, we collect your name,
            email address, and any profile information you choose to add
            (such as a profile picture, gender, or date of birth). When you
            purchase a course, payment is processed securely by our payment
            provider — we do not store your card details.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            2. How we use your information
          </h2>
          <p>
            We use your information to provide access to purchased courses,
            track your learning progress, send you account-related emails
            (such as OTP verification and password resets), and improve the
            platform.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            3. Sharing of information
          </h2>
          <p>
            We do not sell your personal information. We only share data
            with trusted third-party services required to run the platform
            (such as our media storage and payment providers), strictly to
            deliver the service to you.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            4. Your rights
          </h2>
          <p>
            You can view and update your profile information at any time
            from your Dashboard settings. To request deletion of your
            account and associated data, please contact us.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            5. Contact us
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please
            reach out via our{" "}
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

export default PrivacyPolicy