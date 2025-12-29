"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { FaUserPlus, FaUserCircle, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const role = session?.user?.role; // "JOB_SEEKER" or "EMPLOYER"
  const username = session?.user?.name || session?.user?.email; // fallback to email

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">
        <Link href="/">Job Board</Link>
      </h1>

      {/* Navigation */}
      <nav className="flex items-center gap-4">
        {session ? (
          <>
            {/* Role-specific links */}
            {role === "JOB_SEEKER" && (
              <Link
                href="/applications"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Applications
              </Link>
            )}
            {role === "EMPLOYER" && (
              <>
                <Link
                  href="/jobs/my-jobs"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  My Jobs
                </Link>
                <Link
                  href="/jobs/post"
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Post a Job
                </Link>
              </>
            )}

            {/* User avatar dropdown */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 focus:outline-none"
              >
                <FaUserCircle className="text-2xl text-gray-700" />
                <span className="hidden sm:inline text-gray-700 font-medium">
                  {username}
                </span>
                <FaChevronDown className="text-gray-600" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
                  <ul className="flex flex-col">
                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => console.log("Profile clicked")}
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Unsigned user: Create account button */}
            <Link
              href="/auth"
              className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
              title="Create an account"
            >
              <FaUserPlus />
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
