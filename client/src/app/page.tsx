"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import drait from "@/assets/full_logo-wide.png";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // For forgot password email input
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [forgotPassword, setForgotPassword] = useState(false); // Toggle between login and forgot password
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        const decodedToken = jwtDecode(token);

        const user = {
          id: decodedToken.facultyId,
          username: decodedToken.username,
          role: decodedToken.role,
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(decodedToken));

        router.push("/faculty"); // Navigate to faculty page
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Password reset link sent to ${email}`);
    setForgotPassword(false);
  };

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 bg-cover bg-center background-image">
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <div className="text-center mb-6">
            <Image
              src={drait}
              alt="drait logo"
              width={500}
              height={50}
              className="h-16"
            />
          </div>

          {forgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                className="w-full mt-4 text-blue-600 hover:underline"
                onClick={() => setForgotPassword(false)}
              >
                Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Login ID"
                  required
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password"
                  required
                />
                <div
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.486 5 12 5c4.514 0 8.268 2.943 9.542 7-1.274 4.057-5.028 7-9.542 7-4.514 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.486 5 12 5c4.514 0 8.268 2.943 9.542 7-1.274 4.057-5.028 7-9.542 7-4.514 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 px-2 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                  onClick={() => setForgotPassword(true)}
                >
                  FORGOT PASSWORD
                </button>
                <button
                  type="submit"
                  className="flex-1 px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  LOGIN
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 px-2 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                  onClick={() => router.push("faculty/faculty_reg")}
                >
                  Faculty Registration
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
