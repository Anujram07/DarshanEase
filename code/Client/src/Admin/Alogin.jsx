import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaArrowLeft, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaUserShield,
  FaGopuram 
} from 'react-icons/fa';

const Alogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const payload = { email, password };

    try {
      const res = await axios.post("http://localhost:7000/admin/alogin", payload);
      
      if (res.data.Status === "Success") {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/ahome');
      } else {
        setErrorMessage(res.data.Error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Server connection error. Please check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-orange-200/50 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Bar */}
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-amber-700 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/80 shadow-sm"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Home</span>
        </Link>
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
          Admin Portal
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 z-10">
        
        {/* Left Side: Visual Hero & Branding */}
        <div className="md:col-span-5 relative bg-gradient-to-br from-amber-600 via-orange-600 to-amber-800 p-8 text-white flex flex-col justify-between overflow-hidden">
          {/* Subtle Temple Background Pattern / Overlay */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609766857041-ed402ea8069a?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20">
                <FaGopuram className="text-2xl text-amber-100" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Darshan Ease</h1>
                <p className="text-xs text-amber-200/90 font-medium">Management Suite</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="text-2xl font-extrabold leading-snug">
                Manage Temples & Devotee Bookings
              </h2>
              <p className="text-amber-100/80 text-sm leading-relaxed">
                Securely oversee daily darshan slots, verified organizers, user profiles, and real-time reports.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-amber-100/70">
            <FaUserShield className="text-amber-300 text-sm" />
            <span>Authorized access only for administrators</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-1">
              Please enter your admin credentials to continue
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaEnvelope className="text-sm" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@darshanease.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaLock className="text-sm" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-amber-600/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Log In to Dashboard</span>
              )}
            </button>

            {/* Footer Navigation Link */}
            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Need a new admin account?{' '}
                <Link
                  to="/asignup"
                  className="font-semibold text-amber-600 hover:text-amber-700 hover:underline transition-colors ml-1"
                >
                  Create Admin Account
                </Link>
              </p>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Alogin;