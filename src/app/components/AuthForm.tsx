"use client";

import { useState, useRef, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Job Seeker",
  });

  useEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight);
    }
  }, [isSignUp, formData, errorMsg]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const redirectByRole = async () => {
    // Get session to access user role
    const session = await getSession();
    const role = session?.user?.role || formData.role; // fallback to formData role for signup
    if (role === "EMPLOYER") {
      router.push("/jobs/post");
    } else {
      router.push("/jobs/");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (isSignUp) {
      // Signup flow
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg("Passwords do not match");
        setLoading(false);
        return;
      }
      try {
        const payload = {
          name: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          role: formData.role === "Job Seeker" ? "JOB_SEEKER" : "EMPLOYER",
        };

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || "Signup failed");
          setLoading(false);
          return;
        }

        // Automatically log in after signup
        const signInRes = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (signInRes?.error) {
          setErrorMsg(
            signInRes.error === "CredentialsSignin"
              ? "Invalid email or password"
              : signInRes.error
          );
        } else {
          await redirectByRole(); // redirect according to role
        }
      } catch {
        setErrorMsg("Signup failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // Login flow
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (res?.error) {
          setErrorMsg(
            res.error === "CredentialsSignin"
              ? "Invalid email or password"
              : res.error
          );
        } else {
          await redirectByRole(); // redirect according to role
        }
      } catch {
        setErrorMsg("Login failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md lg:max-w-2xl mx-auto mt-10 select-none">
      {/* Text Logo */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-blue-600">Job Board</h1>
        <p className="text-gray-500 text-lg">Your Job Hunting Site</p>
      </div>

      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ height }}
      >
        <div ref={containerRef}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-8 bg-white shadow-lg rounded-lg"
          >
            {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}

            {isSignUp && (
              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 caret-blue-500 select-text text-lg"
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 caret-blue-500 select-text text-lg"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 caret-blue-500 select-text text-lg"
            />
            {isSignUp && (
              <>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 caret-blue-500 select-text text-lg"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 select-text text-lg"
                >
                  <option>Job Seeker</option>
                  <option>Employer</option>
                </select>
              </>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white py-4 rounded hover:bg-blue-600 transition-colors select-none text-lg font-semibold ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? isSignUp
                  ? "Signing Up..."
                  : "Logging In..."
                : isSignUp
                ? "Sign Up"
                : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      <button
        onClick={() => setIsSignUp((prev) => !prev)}
        className="mt-6 text-blue-500 hover:underline select-none text-lg"
      >
        {isSignUp
          ? "Already have an account? Log In"
          : "No account yet? Sign Up"}
      </button>
    </div>
  );
}
