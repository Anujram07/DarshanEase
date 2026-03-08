import React from 'react';

const Services = () => {
  return (
    <div id="services" className="py-16 bg-blue-50">

      <h1 className="text-4xl font-bold text-center text-blue-600 mb-12">
        Services
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold text-blue-500 mb-3">
            Darshan Timings
          </h2>
          <p className="text-gray-600">
            Explore the divine experience with our regular darshan timings.
            Witness the spiritual aura and seek blessings from the divine deities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold text-blue-500 mb-3">
            Special Pooja Services
          </h2>
          <p className="text-gray-600">
            Elevate your spiritual journey with our special pooja services.
            Immerse yourself in sacred rituals and receive blessings from priests.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold text-blue-500 mb-3">
            Online Ticket Booking
          </h2>
          <p className="text-gray-600">
            Conveniently book your darshan tickets online. Save time and ensure
            a seamless entry to the temple premises.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h2 className="text-xl font-semibold text-blue-500 mb-3">
            Customer Service
          </h2>
          <p className="text-gray-600">
            Tailor your spiritual experience with our custom services.
            Personalize your visit to meet your unique spiritual needs.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Services;