import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Mail', badge: 'New' },
  { label: 'Calendar' },
  { label: 'AI' },
]

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 w-full px-4 md:px-8 lg:px-16 py-3 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo.svg"
              alt="Cube logo"
              className="w-8 h-8 cursor-pointer"
            />
            <span className="hidden sm:inline text-base font-semibold tracking-tight text-gray-900">
              Cube
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href="#"
                  className="relative px-3.5 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-colors cursor-pointer"
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-1.5 inline-flex items-center rounded-full bg-blue-50 border border-blue-200/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                      {link.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <button className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100/80 transition-colors cursor-pointer">
              Log in
            </button>
          </Link>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              Register
            </motion.button>
          </Link>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 flex flex-col gap-1 border-t border-gray-100 mt-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  {link.label}
                  {link.badge && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 border border-blue-200/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
              <Link
                to="/login"
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors sm:hidden"
              >
                Log in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
