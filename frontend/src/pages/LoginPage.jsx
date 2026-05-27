import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.status === 200) {
        const data = res.data;

        if (data && data.user) {
          login(data.token, data.user);
        }

        setMessage("Login successful! Redirecting...");
        setMessageType("success");

        const userId = data.user.id;

        setTimeout(() => {
          navigate(`/dashboard/${userId}`);
        }, 1500);
      }
    } catch (error) {
      const errMsg = "Invalid credentials.";
      setMessage(errMsg);
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute top-[-10%] right-[-5%] w-[420px] h-[420px] rounded-full bg-indigo-100/60 blur-3xl"
        animate={{ x: [0, 25, 0], y: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-8%] left-[-5%] w-[360px] h-[360px] rounded-full bg-fuchsia-100/50 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-sm space-y-6 text-center"
      >
        {/* Logo */}
        <motion.img
          variants={itemVariants}
          src="/logo.svg"
          alt="Logo"
          className="w-8 mx-auto"
        />

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
        >
          Log in
        </motion.h2>

        <motion.div variants={itemVariants} className="space-y-2.5">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            className="w-full border border-gray-200 cursor-pointer py-2.5 rounded-lg flex items-center justify-center gap-2.5 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm">Continue with Google</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            className="w-full border border-gray-200 cursor-pointer py-2.5 rounded-lg flex items-center justify-center gap-2.5 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
          >
            <img src="apple.svg" alt="Apple" className="w-5 h-5" />
            <span className="text-sm">Continue with Apple</span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </motion.div>

        <form onSubmit={handleLogin}>
          <motion.div
            variants={containerVariants}
            className="space-y-3 text-left"
          >
            <motion.div variants={itemVariants}>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                <input
                  type="email"
                  placeholder="anyone@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10 hover:border-gray-300"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="text-sm text-gray-600 mb-1 block">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 pl-10 pr-10 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10 hover:border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.985 }}
              className="group w-full bg-black hover:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm shadow-black/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </motion.button>

            <AnimatePresence mode="wait">
              {message && (
                <motion.div
                  key={message}
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className={`text-sm px-4 py-2 rounded-lg border ${
                    messageType === "success"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              variants={itemVariants}
              className="text-xs text-center text-gray-500 mt-3 space-y-1"
            >
              <a
                href="#"
                className="hover:text-black transition-colors underline underline-offset-2"
              >
                Forgot password?
              </a>
              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-black font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Register
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </form>

        <motion.p
          variants={itemVariants}
          className="text-xs text-gray-400 leading-relaxed"
        >
          By clicking "Continue", you acknowledge that you have read and
          understood, and agree to the{" "}
          <a href="#" className="underline underline-offset-2 hover:text-gray-600 transition-colors">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-2 hover:text-gray-600 transition-colors">
            Privacy Policy
          </a>
          .
        </motion.p>
      </motion.div>
    </div>
  );
};
