// src/components/dashboard/AccountInfo.jsx
import { formatDate } from '@/utils/formatters';
import { FaUser, FaEnvelope, FaCalendarAlt, FaCrown } from 'react-icons/fa';

const AccountInfo = ({ user }) => {
  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Account Information</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="bg-[#374151] p-2 rounded-lg">
            <FaUser className="text-white text-lg" />
          </div>
          <div className="ml-3">
            <p className="text-gray-400 text-sm">Full Name</p>
            <p className="font-bold text-white">{user?.name}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#374151] p-2 rounded-lg">
            <FaEnvelope className="text-white text-lg" />
          </div>
          <div className="ml-3">
            <p className="text-gray-400 text-sm">Email</p>
            <p className="font-bold text-white">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#374151] p-2 rounded-lg">
            <FaCalendarAlt className="text-white text-lg" />
          </div>
          <div className="ml-3">
            <p className="text-gray-400 text-sm">Member Since</p>
            <p className="font-bold text-white">{formatDate(user?.createdAt, false)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="bg-[#374151] p-2 rounded-lg">
            <FaCrown className="text-white text-lg" />
          </div>
          <div className="ml-3">
            <p className="text-gray-400 text-sm">Role</p>
            <p className="font-bold text-white capitalize">
              {user?.role === 'admin' ? 'Admin' : 'User'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;