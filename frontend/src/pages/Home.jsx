import React from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Trusted } from '../components/Trusted'
import { ProductDisplay } from '../components/ProductDisplay'
import { Footer } from '../components/Footer'

export const Home = () => {
  return (
    <div>
        <Header />
        <Hero />
        <Trusted />
        <ProductDisplay />
        <Footer />
    </div>
  )
}
