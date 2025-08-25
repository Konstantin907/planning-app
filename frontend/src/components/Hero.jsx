import React from 'react'

export const Hero = () => {
  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-16 py-20">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left part */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl tracking-wide md:text-5xl bold text-gray-900 leading-tight">
            The team workspace <br /> that works for you.
          </h1>
          <p className="mt-4 medium text-gray-700">
            One place where teams find every answer, automate the busywork, and get projects done.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-sm transition">
              Get Notion free
            </button>
            <button className="bg-blue-100 cursor-pointer text-blue-700 hover:bg-blue-200 px-6 py-3 rounded-md font-medium text-sm transition">
              Request a demo
            </button>
          </div>
        </div>

        {/* SVG */}
        <div className="flex justify-center md:justify-end max-w-md w-full">
          <img src='/team.svg' alt="Hero illustration" className="w-full h-auto" />
        </div>
      </div>
    </section>
  )
}
