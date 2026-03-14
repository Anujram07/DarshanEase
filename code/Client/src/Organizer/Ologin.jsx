import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt } from 'react-icons/fa';

const Ologin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload = { email, password };

    axios
      .post("http://localhost:7000/organizer/ologin", payload)
      .then((res) => {

        if (res.data.Status === "Success") {

          localStorage.setItem('user', JSON.stringify(res.data.organizer));
          navigate('/ohome');
          alert("Login successful");

        } else {
          alert("Wrong credentials");
        }

      })
      .catch((err) => console.log(err));
  };

  const formHandle1 = (e) => {
    e.preventDefault();
    navigate("/osignup");
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-purple-100 to-green-200">

      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 text-gray-700 hover:text-black text-2xl"
      >
        <FaSignOutAlt />
      </Link>

      {/* Login Card */}
      <div className="bg-white shadow-2xl rounded-xl flex overflow-hidden w-[750px]">

        {/* Left Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://i.pinimg.com/originals/9a/a6/12/9aa612d9c56c38e14b009f2184b67039.jpg"
            alt="temple"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Organizer Login
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Password
              </label>

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Login
            </button>

            {/* Signup */}
            <p className="text-center text-sm text-gray-500">
              Don't have an account?
              <button
                onClick={formHandle1}
                className="ml-2 text-blue-600 font-semibold hover:underline"
              >
                Signup
              </button>
            </p>

          </form>

        </div>

      </div>

    </div>

  );
};

export default Ologin;