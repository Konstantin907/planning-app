import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await api.post('/auth/login', { email, password });
  
      if (res.status === 200) {
        const data = res.data;

        if(data && data.user){
            login(data.token, data.user) 
        }

        setMessage('Login successful! Redirecting...');
        setMessageType('success');

        const userId = data.user.id;

        setTimeout(() => {
          navigate(`/dashboard/${userId}`);
        }, 1500);
      }
    } catch (error) {
      const errMsg = 'Invalid credentials.';
      setMessage(errMsg);
      setMessageType('error');
  
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 2000);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white">
      {/* Logo */}
      <img src="/logo.svg" alt="Logo" className="w-8 mb-6" />

      {/* Card */}
      <div className="w-full max-w-sm primary tracking-wide space-y-4 text-center">
        <h2 className="text-3xl bold text-gray-900">Log in</h2>

        {/* OAuth buttons */}
        <button className="w-full border cursor-pointer border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm">Continue with Google</span>
        </button>

        <button className="w-full border border-gray-300 cursor-pointer py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition">
          <img
            src="apple.svg"
            alt="Apple"
            className="w-5 h-5"
          />
          <span className="text-sm">Continue with Apple</span>
        </button>

        {/* Email/password login */}
        <form onSubmit={handleLogin}>
          <div className="space-y-3 pt-2 text-left primary">
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="anyone@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 border px-4 py-2 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 border px-4 py-2 rounded-md text-sm"
              />
            </div>

            <button type="submit" className="w-full bg-black cursor-pointer text-white py-2 rounded-md text-sm hover:opacity-90">
              Continue
            </button>

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

            <div className="text-xs text-center text-gray-500 mt-2">
              <a href="#" className="hover:underline">
                Forgot password?
              </a>{" "}
              <br />
              You have an account?{" "}
              <Link to="/register" className="text-black hover:underline">
                Register
              </Link>
            </div>
          </div>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-400 mt-4">
          By clicking "Continue", you acknowledge that you have read and
          understood, and agree to the Notion’s
          <a href="#" className="underline mx-1">
            Terms & Conditions
          </a>{" "}
          and
          <a href="#" className="underline ml-1">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};
