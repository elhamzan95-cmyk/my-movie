// src/components/profile/ProfileTab.jsx
import InfoItem from '../InfoItem';
import { FaEnvelope, FaCalendarAlt, FaCrown, FaInfoCircle } from 'react-icons/fa';

const ProfileTab = ({ profileUser, joinedDate }) => {
  if (!profileUser) return null;

  return (
    <div className="bg-[#2A2A2A] rounded-xl shadow-md p-6 border border-orange-500/30">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
        User Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem
          icon={FaEnvelope}
          label="Email"
          value={profileUser.email}
        />
        <InfoItem
          icon={FaCalendarAlt}
          label="Join Date"
          value={joinedDate}
        />
        <InfoItem
          icon={FaCrown}
          label="Role"
          value={profileUser.role === 'admin' ? 'Admin' : 'User'}
        />
        {profileUser.bio && (
          <div className="md:col-span-2">
            <InfoItem
              icon={FaInfoCircle}
              label="About"
              value={profileUser.bio}
              isMultiLine
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;