import React from 'react'

const cards = [
    {
      title: 'Get started on Cube',
      desc: 'Your AI workspace.',
      buttons: [
        { text: 'Download for Windows' },
        { text: 'Download from the Microsoft Store', icon: '🛍️' }
      ],
    image: '/design.png'
    },
    {
      title: 'Cube Workspace Mail',
      desc: 'The inbox that thinks like you.',
      buttons: [{ text: 'Download' }],
      image: '/mail.png'
    },
    {
      title: 'Cube Calendar',
      desc: 'Time and work, together on the same schedule everyday, and a same rhytm.',
      buttons: [{ text: 'Download' }],
      image: '/calendar.png'
    },
    {
      title: 'Cube Pricing',
      desc: 'Our pricing plans, components and requests.',
      image: '/price.png',
      buttons: [{ text: 'Sign In' }],
    }
  ];

export const ProductDisplay = () => {
  return (
    <section className="w-full bg-[#fafafa] py-12 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between min-h-[300px]"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 bold">
                {card.title}
              </h3>
              <p className="text-gray-600 mt-1 primary">{card.desc}</p>
            </div>

            {/* Btn */}
            {card.buttons && (
              <div className="flex flex-col gap-2 mt-2">
                {card.buttons.map((btn, i) => (
                  <button
                    key={i}
                    className="bg-black text-white text-sm font-medium px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:opacity-90"
                  >
                    {btn.icon && <span>{btn.icon}</span>}
                    {btn.text}
                  </button>
                ))}
              </div>
            )}


            {card.image && (
              <div className="mt-6">
                <img
                  src={card.image}
                  alt="preview"
                  className="rounded-lg h-[300px] w-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
