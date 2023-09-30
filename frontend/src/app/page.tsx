'use client'

import Navigation from './modules/Navigation'
import LandingBanner from './modules/LandingBanner'

export default function Home() {
  return (
    <main>
      <Navigation />

      <LandingBanner />

      <div className="container my-4">
        <h1 className="text-center">Hello world!</h1>
      </div>
    </main>
  )
}
