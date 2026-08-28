import React from "react"

const CookiePolicy = () => {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent py-16 text-richblack-5">
      <h1 className="mb-2 text-4xl font-semibold">Cookie Policy</h1>
      <p className="mb-8 text-sm text-richblack-400">Last updated: 2026</p>

      <div className="flex max-w-3xl flex-col gap-6 text-richblack-300">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            What are cookies?
          </h2>
          <p>
            Cookies are small text files stored on your device that help
            websites remember information about your visit, such as your
            login session and preferences.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            How we use cookies
          </h2>
          <p>
            StudyOrbit uses cookies mainly to keep you logged in during your
            session and to remember your preferences (like items in your
            cart) as you browse the platform.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            Managing cookies
          </h2>
          <p>
            Most web browsers let you control cookies through their
            settings. Disabling cookies may affect your ability to stay
            logged in or use certain features of the platform.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-richblack-5">
            Contact us
          </h2>
          <p>
            Questions about this Cookie Policy? Reach out via our{" "}
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

export default CookiePolicy