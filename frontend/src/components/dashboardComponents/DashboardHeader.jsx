import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';

export const DashboardHeader = () => {
  const { user } = useContext(AuthContext);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4 py-6"
    >
      <div className="flex shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm">
        <img className="h-5 w-7" src="/logo.svg" alt="" />
      </div>

      <div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
          {greeting}, {user.name}
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </motion.div>
  );
};
