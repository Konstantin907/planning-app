import React from 'react'
import { motion } from 'framer-motion'
import { Globe, ArrowUpRight } from 'lucide-react'
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const linkSections = [
  {
    title: 'Company',
    links: ['About us', 'Careers', 'Security', 'Status', 'Terms & privacy'],
  },
  {
    title: 'Download',
    links: ['iOS & Android', 'Mac & Windows', 'Calendar', 'Web Clipper'],
  },
  {
    title: 'Resources',
    links: ['Help center', 'Pricing', 'Blog', 'Community', 'Integrations', 'Templates', 'Affiliates'],
  },
  {
    title: 'Cube for',
    links: ['Enterprise', 'Small business', 'Personal'],
    cta: 'Explore more',
  },
]

const socials = [
  { label: 'Instagram', icon: <FaInstagram /> },
  { label: 'X', icon: <FaXTwitter /> },
  { label: 'LinkedIn', icon: <FaLinkedin /> },
  { label: 'Facebook', icon: <FaFacebook /> },
  { label: 'YouTube', icon: <FaYoutube /> },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-slate-50 border-t border-gray-100 px-6 md:px-12 pt-16 pb-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 lg:gap-12">
          <motion.div
            className="col-span-2 space-y-5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <img src="/logo.svg" alt="Logo" className="h-7" />
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs primary">
              One workspace for your docs, projects, and knowledge — powered by AI.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-900 hover:text-white transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <button className="inline-flex items-center gap-2 border border-gray-200 hover:border-gray-300 rounded-lg px-3.5 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
              <Globe size={15} className="text-gray-400" />
              English
              <span className="text-[10px] text-gray-400">&#9662;</span>
            </button>
          </motion.div>

          {linkSections.map((section, i) => (
            <motion.div
              key={section.title}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              {section.cta && (
                <a
                  href="#"
                  className="inline-flex items-center gap-1 mt-5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {section.cta}
                  <ArrowUpRight size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-14 pt-6 border-t border-gray-200/70 flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Cube Labs, Inc. All rights reserved.
          </p>
          <a
            href="#"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            Cookie settings
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
