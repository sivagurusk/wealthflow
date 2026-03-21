import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Sidebar from '../components/Sidebar';
import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';
import { format } from 'date-fns';

const Profile = () => {
  const { user } = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // TODO: Add API call to update profile
    setIsEditing(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return '?';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Profile Settings</h2>
          <p className="text-gray-500 mt-1">View and manage your account information.</p>
        </header>

        <div className="max-w-2xl">
          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-r from-emerald-500 to-emerald-700"></div>

            {/* Profile Content */}
            <div className="p-8">
              {/* Avatar and Name */}
              <div className="flex items-end gap-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg -mt-16">
                  {getUserInitials()}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{user?.name}</h3>
                  <p className="text-emerald-600 text-sm font-medium">Active Member</p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition font-medium"
                >
                  {isEditing ? (
                    <>
                      <X size={18} />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 size={18} />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              {/* Account Information */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                        <User size={20} className="text-gray-400" />
                        <p className="text-gray-700 font-medium">{user?.name}</p>
                      </div>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                        <Mail size={20} className="text-gray-400" />
                        <p className="text-gray-700 font-medium">{user?.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Member Since */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                    <Calendar size={20} className="text-gray-400" />
                    <p className="text-gray-700 font-medium">{format(new Date(), 'MMMM dd, yyyy')}</p>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
              <p className="text-gray-500 text-xs font-medium mb-2">Account Status</p>
              <p className="text-lg font-bold text-emerald-600">Active</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
              <p className="text-gray-500 text-xs font-medium mb-2">Account Type</p>
              <p className="text-lg font-bold text-gray-800">Personal</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
              <p className="text-gray-500 text-xs font-medium mb-2">Two-Factor Auth</p>
              <p className="text-lg font-bold text-gray-400">Disabled</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
