import React from 'react'

const Footer = () => {
  return (
    <div id="contact">
      <footer className="bg-black text-white py-8 text-center">

        <div className="flex justify-center mb-4">
          <button
            id="bt"
            className="h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
          >
            Contact Us
          </button>
        </div>

        <p className="text-gray-300 max-w-3xl mx-auto mb-3">
          "Embark on a Spiritual Journey, One Darshan at a Time – Seamless Temple
          Darshan Ticket Booking at Your Fingertips!"
        </p>

        <p className="text-gray-400 mb-1">
          📞 Call At: 127-865-586-67
        </p>

        <p className="text-gray-500 text-sm">
          Copyright &copy; {new Date().getFullYear()} By DarshanEase. <br />
          All Rights Reserved.
        </p>

      </footer>
    </div>
  )
}

export default Footer