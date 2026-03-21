import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { LayoutDashboard, Receipt, User, LogOut, Wallet } from 'lucide-react';

const Sidebar = () => {
  const { logout, user } = useContext(GlobalContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-emerald-950 min-h-screen text-white flex flex-col p-6 fixed">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-emerald-500 p-2 rounded-lg">
          <Wallet size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-emerald-50">WealthFlow</h1>
      </div>

      <nav className="flex-1 space-y-4">
        <Link to="/" className={`flex items-center gap-4 p-3 rounded-xl transition duration-200 ${isActive('/') ? 'text-emerald-100 bg-emerald-800/50 cursor-not-allowed' : 'text-emerald-400 hover:text-white'}`}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>
        <Link to="/transactions" className={`flex items-center gap-4 p-3 rounded-xl transition duration-200 ${isActive('/transactions') ? 'text-emerald-100 bg-emerald-800/50' : 'text-emerald-400 hover:text-white'}`}>
          <Receipt size={20} />
          <span className="font-medium">Transactions</span>
        </Link>
        <Link to="/profile" className={`flex items-center gap-4 p-3 rounded-xl transition duration-200 ${isActive('/profile') ? 'text-emerald-100 bg-emerald-800/50' : 'text-emerald-400 hover:text-white'}`}>
          <User size={20} />
          <span className="font-medium">Profile</span>
        </Link>
      </nav>

      <div className="mt-auto pt-6 border-t border-emerald-900">
        <div className="mb-4">
          <p className="text-sm text-emerald-500">Logged in as</p>
          <p className="font-semibold">{user?.name}</p>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 py-2 w-full transition duration-200"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
