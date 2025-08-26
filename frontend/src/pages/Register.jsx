import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        setMessage("Registration successful! Redirecting...");
        setMessageType("success");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setMessage(errMsg);
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-neutral-800 to-black text-white items-center justify-center p-12 rounded-r-3xl">
        <div className="max-w-md text-center space-y-6">
          <h2 className="text-3xl font-bold bold tracking-wider">
            Manage your work anywhere
          </h2>
          <p className="text-gray-300 text-sm primary">
            View all the tasks and grow your work from anywhere!
          </p>
          <div className="rounded-xl p-4 text-left text-sm space-y-2">
            <p className="text-white primary tracking-wider">
              “This platform is a game-changer! It's easy to use, provides
              valuable insights, and has helped me make smarter business
              decisions.”
            </p>
            <div className="flex items-center gap-2 pt-2">
              <img
                src="/avatar.jpg"
                alt="register_img"
                className="w-6 h-6 rounded-full"
              />
              <div>
                <p className="font-medium text-white light">Casey Bachmeyer</p>
                <p className="text-xs text-gray-400 light">
                  Founder, Sisyphus Ventures
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side register */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 bold">
            Create an account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              className="w-full border px-4 py-2 rounded-md text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="anyone@gmail.com"
              className="w-full border px-4 py-2 rounded-md text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border px-4 py-2 rounded-md text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Checkbox */}
            <label className="text-xs flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-black" /> I accept the{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </label>

            <button
              type="submit"
              className="w-full cursor-pointer bg-black hover:bg-slate-900 text-white font-medium py-2 rounded-md text-sm"
            >
              Create an Account
            </button>
          </form>

          {message && (
            <div
              className={`text-sm mt-2 px-4 py-2 rounded-md border ${
                messageType === "success"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : "bg-red-100 text-red-700 border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-medium underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
