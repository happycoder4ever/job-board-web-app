import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-blue-50 via-blue-100 to-white">
      {/* Logo / App Name */}
      <h1 className="text-5xl font-extrabold text-blue-600 mb-4 drop-shadow-lg">
        Job Board
      </h1>
      <p className="text-xl text-gray-700 mb-8 max-w-xl drop-shadow-sm">
        Connect with top employers or discover the best talent. Job Board is
        your gateway to finding jobs or candidates quickly and efficiently.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/auth"
          className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition shadow-md"
        >
          Get Started
        </Link>
        <Link
          href="/jobs/"
          className="border border-blue-500 text-blue-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition shadow-md"
        >
          Browse Jobs
        </Link>
      </div>

      {/* Features / Description */}
      <section className="mt-16 max-w-3xl text-left space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-700">
            For Job Seekers
          </h2>
          <p className="text-gray-600">
            Browse jobs, apply easily, and manage your professional profile in
            one place.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-700">
            For Employers
          </h2>
          <p className="text-gray-600">
            Post job openings, review applications, and find the right
            candidates quickly.
          </p>
        </div>
      </section>
    </div>
  );
}
