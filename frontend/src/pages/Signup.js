import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Wallet } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await signup(name, email, password);
    if (res.success) {
      toast.success('Account created successfully!', {
        duration: 4000,
        position: 'top-right',
        style: { background: '#064e3b', color: '#fff', borderRadius: '12px' }
      });
      navigate('/');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-emerald-600 p-3 rounded-xl mb-4 text-white">
            <Wallet size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Create Account</h1>
          <p className="text-gray-500 text-center">Join WealthFlow today to start tracking your finances.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase text-xs">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase text-xs">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 uppercase text-xs">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-emerald-700/20 mt-2">
            Sign Up
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
