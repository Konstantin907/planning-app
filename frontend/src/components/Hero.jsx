import React from 'react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white px-6 md:px-10 lg:px-16 py-24 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-300/15 blur-3xl"
      />

      <div className="relative max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-14">
        <motion.div
          className="text-center md:text-left max-w-xl"
          variants={container}
          initial="hidden"
          animate="show"
        >

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl md:text-5xl lg:text-6xl bold text-gray-900 leading-[1.1] tracking-tight"
          >
            The team workspace{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              that works for you.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-lg medium text-gray-600 leading-relaxed"
          >
            One place where teams find every answer, automate the busywork, and get projects done.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-medium text-sm shadow-lg shadow-blue-600/25 transition-colors"
            >
              Get Notion free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white cursor-pointer text-blue-700 border border-blue-200 hover:border-blue-300 hover:bg-blue-50 px-7 py-3.5 rounded-xl font-medium text-sm transition-colors"
            >
              Request a demo
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center md:justify-end max-w-lg w-full"
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full"
          >
            <div
              aria-hidden
              className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 blur-2xl"
            />
            <img
              src="/team.svg"
              alt="Hero illustration"
              className="relative w-full h-auto drop-shadow-xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
