import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const cards = [
  {
    title: 'Get started on Cube',
    desc: 'Your AI workspace.',
    buttons: [
      { text: 'Download for Windows', primary: true },
      { text: 'Download from the Microsoft Store', icon: '🛍️' },
    ],
    image: '/design.png',
    accent: 'from-blue-500/10 to-indigo-500/10',
  },
  {
    title: 'Cube Workspace Mail',
    desc: 'The inbox that thinks like you.',
    buttons: [{ text: 'Download', primary: true }],
    image: '/mail.png',
    accent: 'from-violet-500/10 to-purple-500/10',
  },
  {
    title: 'Cube Calendar',
    desc: 'Time and work, together on the same schedule every day.',
    buttons: [{ text: 'Download', primary: true }],
    image: '/calendar.png',
    accent: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    title: 'Cube Pricing',
    desc: 'Our pricing plans, components and requests.',
    image: '/price.png',
    buttons: [{ text: 'Sign In', primary: true }],
    accent: 'from-amber-500/10 to-orange-500/10',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const ProductDisplay = () => {
  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white py-20 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl bold text-gray-900 tracking-tight">
            Everything your team needs
          </h2>
          <p className="mt-3 text-gray-500 medium max-w-lg mx-auto">
            One platform, every workflow. Choose the tools that fit your team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 lg:p-8 flex flex-col justify-between min-h-[420px] hover:border-gray-300 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br ${card.accent} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <h3 className="text-xl lg:text-2xl bold text-gray-900 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-gray-500 mt-2 primary leading-relaxed">{card.desc}</p>

                {card.buttons && (
                  <div className="flex flex-wrap gap-3 mt-5">
                    {card.buttons.map((btn, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`text-sm font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
                          btn.primary
                            ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {btn.icon && <span>{btn.icon}</span>}
                        {btn.text}
                        {btn.primary && <ArrowRight size={14} className="opacity-60" />}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {card.image && (
                <div className="relative mt-6 overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-[220px] lg:h-[260px] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
