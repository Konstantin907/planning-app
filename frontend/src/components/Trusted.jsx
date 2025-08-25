import React from 'react'

const brands = [
  { name: 'OpenAI', src: '/trusted/openai.png'},
  { name: 'Figma', src: '/trusted/figma.png' },
  { name: 'Cursor', src: '/trusted/cursor-ai.png' },
  { name: 'Headspace', src: '/trusted/headspace.svg' },
  { name: 'Perplexity', src: '/trusted/perplexity.png' },
  { name: 'Vercel', src: '/trusted/vercel.svg' }
];

export const Trusted = () => {
  return (
    <section className="w-full bg-white py-20 px-6 md:px-12">
    <div className="max-w-screen-xl mx-auto text-center">
      <p className="text-sm text-gray-500 mb-6">Trusted by top teams</p>
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        {brands.map((brand) => (
          <img
            key={brand.name}
            src={brand.src}
            alt={brand.name}
            className="h-6 md:h-8 object-contain grayscale hover:grayscale-0 transition"
          />
        ))}
      </div>
    </div>
  </section>
  )
}
