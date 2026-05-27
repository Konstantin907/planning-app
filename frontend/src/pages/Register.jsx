import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";
import api from "../api";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("Registration successful! Redirecting...");
        setMessageType("success");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setMessage(errMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden md:flex md:w-1/2 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black text-white items-center justify-center p-12 rounded-r-3xl overflow-hidden"
      >
        {/* Decorative glows */}
        <motion.div
          aria-hidden
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-fuchsia-500/10 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative max-w-md text-center space-y-6 z-10"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold tracking-wider leading-tight"
          >
            Manage your work anywhere
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-sm primary"
          >
            View all the tasks and grow your work from anywhere!
          </motion.p>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="rounded-2xl p-5 text-left text-sm space-y-3 bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl"
          >
            <p className="text-white/90 primary tracking-wider leading-relaxed">
              “This platform is a game-changer! It's easy to use, provides
              valuable insights, and has helped me make smarter business
              decisions.”
            </p>
            <div className="flex items-center gap-3 pt-2">
              <img
                src="/avatar.jpg"
                alt="register_img"
                className="w-8 h-8 rounded-full ring-2 ring-white/20 object-cover"
              />
              <div>
                <p className="font-medium text-white light">Casey Bachmeyer</p>
                <p className="text-xs text-gray-400 light">
                  Founder, Sisyphus Ventures
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right side register */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full max-w-md space-y-6"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 bold tracking-tight">
              Create an account
            </h2>
            <p className="text-sm text-gray-500">
              Start planning your week in under a minute.
            </p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <motion.div variants={itemVariants} className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="text"
                placeholder="First Name"
                className="w-full border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10 hover:border-gray-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="email"
                placeholder="anyone@gmail.com"
                className="w-full border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10 hover:border-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border border-gray-200 pl-10 pr-10 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/10 hover:border-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            </motion.div>

            <motion.label
              variants={itemVariants}
              className="text-xs flex items-center gap-2 text-gray-600 select-none cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-black"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />{" "}
              I accept the{" "}
              <a href="#" className="underline hover:text-black transition-colors">
                Privacy Policy
              </a>
            </motion.label>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.985 }}
              className="group w-full cursor-pointer bg-black hover:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors shadow-sm shadow-black/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create an Account
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </motion.button>
          </motion.form>

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

          <motion.p
            variants={itemVariants}
            className="text-sm text-center text-gray-600"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
            >
              Log in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};
