import { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  Lock,
  Camera,
  Loader2,
  Save,
  Settings as SettingsIcon,
  Mail,
  Eye,
  EyeOff,
  KeyRound,
  ShieldCheck,
  ImagePlus,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api";

const SERVER_URL = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "");

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const PasswordInput = ({ value, onChange, placeholder, label }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-500">
        <KeyRound size={11} />
        {label}
      </label>
      <div className="group relative">
        <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-violet-400" size={14} />
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-neutral-700 bg-neutral-900/80 py-2.5 pl-9 pr-10 text-sm outline-none transition-all duration-200 placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 hover:border-neutral-600"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 transition-colors hover:text-gray-300 cursor-pointer"
          aria-label={visible ? "Hide" : "Show"}
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
};

export const Settings = () => {
  const { user, token, updateUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(res.data.name || "");
        setEmail(res.data.email || "");
        setAvatar(res.data.avatar || "");
        updateUser({
          id: res.data._id,
          name: res.data.name,
          email: res.data.email,
          avatar: res.data.avatar,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    if (token) fetchUser();
  }, [token]);

  const avatarUrl = avatar ? `${SERVER_URL}${avatar}` : null;
  const initials = name?.charAt(0)?.toUpperCase() || "?";
  const nameChanged = name.trim() !== (user?.name || "");

  const handleSaveProfile = async () => {
    if (!name.trim() || savingProfile) return;
    setSavingProfile(true);
    try {
      const res = await api.put(
        "/user/profile",
        { name: name.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateUser(res.data);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || uploadingAvatar) return;

    setUploadingAvatar(true);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await api.post("/user/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAvatar(res.data.avatar);
      updateUser(res.data);
      toast.success("Avatar updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleChangePassword = async () => {
    if (savingPassword) return;
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setSavingPassword(true);
    try {
      await api.put(
        "/user/password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordChanged(true);
      toast.success("Password changed successfully");
      setTimeout(() => setPasswordChanged(false), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="w-full max-w-2xl text-white pb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <div className="flex items-center gap-3">
          <div className="relative rounded-2xl bg-gradient-to-br from-violet-500/30 to-indigo-500/20 p-3 text-violet-400 shadow-lg shadow-violet-500/10">
            <SettingsIcon size={24} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage your account, profile and security
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-5"
      >
        <motion.section
          variants={itemVariants}
          className="overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 shadow-xl shadow-black/20"
        >
          <div className="border-b border-neutral-800 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
                <User size={14} />
              </div>
              <h3 className="text-sm font-semibold tracking-wide text-gray-300">
                Profile
              </h3>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <div className="relative shrink-0">
                <motion.button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-neutral-700 bg-neutral-900 transition-all hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 cursor-pointer disabled:opacity-60"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-violet-400">
                      {initials}
                    </span>
                  )}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    {uploadingAvatar ? (
                      <Loader2 size={20} className="animate-spin text-white" />
                    ) : (
                      <>
                        <Camera size={18} className="text-white" />
                        <span className="text-[10px] font-medium text-white/80">Upload</span>
                      </>
                    )}
                  </div>
                </motion.button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-900 bg-violet-600 text-white">
                  <ImagePlus size={11} />
                </div>
              </div>

              <div className="w-full flex-1 space-y-4">
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <User size={11} />
                    Display name
                  </label>
                  <div className="group relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-violet-400" size={14} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-900/80 py-2.5 pl-9 pr-4 text-sm outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/15 hover:border-neutral-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <Mail size={11} />
                    Email address
                  </label>
                  <div className="group relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 py-2.5 pl-9 pr-4 text-sm text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-gray-600">
                    Contact support to change your email
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-neutral-800 pt-5">
              <AnimatePresence>
                {nameChanged && (
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="text-xs text-violet-400"
                  >
                    Unsaved changes
                  </motion.p>
                )}
              </AnimatePresence>
              {!nameChanged && <span />}
              <motion.button
                onClick={handleSaveProfile}
                disabled={savingProfile || !name.trim() || !nameChanged}
                whileHover={{ scale: savingProfile || !nameChanged ? 1 : 1.03 }}
                whileTap={{ scale: savingProfile || !nameChanged ? 1 : 0.97 }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium shadow-md shadow-violet-600/20 transition-colors hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {savingProfile ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    Save profile
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={itemVariants}
          className="overflow-hidden rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-800/50 to-neutral-900/50 shadow-xl shadow-black/20"
        >
          <div className="border-b border-neutral-800 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
                <ShieldCheck size={14} />
              </div>
              <div>
                <h3 className="text-sm font-semibold tracking-wide text-gray-300">
                  Security
                </h3>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Update your password to keep your account secure
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5 sm:p-6">
            <PasswordInput
              label="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <PasswordInput
                label="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 6 characters"
              />
              <PasswordInput
                label="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />
            </div>

            {newPassword && confirmPassword && newPassword !== confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-400"
              >
                Passwords do not match
              </motion.p>
            )}

            <div className="flex items-center justify-between border-t border-neutral-800 pt-5">
              <AnimatePresence>
                {passwordChanged && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-1.5 text-xs text-emerald-400"
                  >
                    <ShieldCheck size={13} />
                    Password updated
                  </motion.div>
                )}
              </AnimatePresence>
              {!passwordChanged && <span />}
              <motion.button
                onClick={handleChangePassword}
                disabled={savingPassword || !currentPassword || !newPassword || !confirmPassword}
                whileHover={{ scale: savingPassword ? 1 : 1.03 }}
                whileTap={{ scale: savingPassword ? 1 : 0.97 }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-5 py-2.5 text-sm font-medium transition-all hover:bg-neutral-700 hover:border-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {savingPassword ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Change password
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};
