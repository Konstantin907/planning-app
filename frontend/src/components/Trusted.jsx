import React from 'react'
import { motion } from 'framer-motion'

const brands = [
  { name: 'OpenAI', src: '/trusted/openai.png' },
  { name: 'Figma', src: '/trusted/figma.png' },
  { name: 'Cursor', src: '/trusted/cursor-ai.png' },
  { name: 'Headspace', src: '/trusted/headspace.svg' },
  { name: 'Perplexity', src: '/trusted/perplexity.png' },
  { name: 'Vercel', src: '/trusted/vercel.svg' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

const fadeIn = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export const Trusted = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-slate-50 py-16 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="h-px w-10 bg-gray-300" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Trusted by teams worldwide
          </p>
          <span className="h-px w-10 bg-gray-300" />
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={fadeIn}
              className="group relative px-2"
            >
              <img
                src={brand.src}
                alt={brand.name}
                className="h-6 md:h-8 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
