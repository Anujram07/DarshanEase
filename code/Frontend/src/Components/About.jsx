import React from 'react'
import './navbar.css'

const About = () => {
  return (
    <div id="about" className="pt-16 bg-gray-50 flex justify-center">
      
      <div className="max-w-5xl bg-white shadow-xl rounded-2xl p-10">
        
        <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">
          About Darshan Booking
        </h2>

        <p className="text-center text-gray-600 text-lg mb-6">
          System has been enhanced after discussion with a few major temples.
        </p>

        <ol className="list-disc pl-10 space-y-3 text-gray-700 text-lg">
          <li>
            All major temples across India are implementing the Darshan Token | 
            E-Queue | Ticket Booking system to control the rush of devotees.
          </li>

          <li>
            Social Distancing, Crowd Management, Contact Tracing with minimum 
            physical interaction / touch.
          </li>

          <li>
            Online Advance Booking (for devotees having internet knowledge and 
            coming from far-off places).
          </li>

          <li>
            On-the-spot Darshan Token issuance interface (for devotees who do 
            not have internet knowledge, mostly locals).
          </li>

          <li>
            Developed after thorough research and consultation with the major 
            temples across India (Darshan Token | E-Queue | Ticket Booking system).
          </li>

          <li>
            Daily reports for gatekeepers / security and periodical reports 
            for management to review usage and details.
          </li>

          <li>
            On-the-spot Darshan Token issuance for smooth temple entry.
          </li>
        </ol>

      </div>

    </div>
  )
}

export default About