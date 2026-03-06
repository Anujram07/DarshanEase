import React from 'react'
import Banner from './Banner'
import Temples from './Temples'
import About from './About'
import Footer from './Footer'
import NavBar from './Navbar'
import Services from './Services'

const Home = () => {
  return (
    <div id="home" className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <NavBar />

      {/* Main Content */}
      <div className="pt-16 flex flex-col gap-12">

        <Banner />

        <div className="max-w-7xl mx-auto w-full px-4">
          <Temples />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4">
          <About />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4">
          <Services />
        </div>

        <Footer />

      </div>

    </div>
  )
}

export default Home