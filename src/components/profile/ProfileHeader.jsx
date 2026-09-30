import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FollowButton from '@/components/FollowButton';
import StatBox from './StatBox';
import { updateUserAvatar } from '../../services/users';

const ProfileHeader = ({
  profileUser,
  currentUser,
  followerStatus,
  onFollowChange,
  userMoviesCount,
  onAvatarUpdate
}) => {
  const [uploading, setUploading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const fileInputRef = useRef(null);

  const currentUserId = currentUser?._id || currentUser?.id || currentUser?.uid;
  const profileUserId = profileUser._id || profileUser.id;
  const isOwnProfile = currentUserId && profileUserId && currentUserId === profileUserId;
  const joinedDate = new Date(profileUser.createdAt).toLocaleDateString('en-US');

  const handleAvatarClick = () => {
    if (isOwnProfile) {
      fileInputRef.current.click();
    } else if (profileUser.avatar) {
      setShowImageModal(true);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Only images in JPG, PNG, GIF, or WebP format are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must not exceed 5MB.');
      return;
    }

    setUploading(true);
    try {
      const response = await updateUserAvatar(file);
      if (response.success) {
        onAvatarUpdate(response.user.avatar);
      } else {
        alert(response.message || 'Error uploading image');
      }
    } catch (error) {
      alert(error.message || 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-[#2A2A2A] rounded-2xl p-8 mb-8 border border-orange-500/30 shadow-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0 relative group">
          <div
            className={`w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl overflow-hidden ${
              isOwnProfile || profileUser.avatar ? 'cursor-pointer' : ''
            }`}
            onClick={handleAvatarClick}
          >
            {profileUser.avatar ? (
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-full h-full object-cover"
              />
            ) : (
              profileUser.name?.charAt(0) || 'U'
            )}
          </div>

          {/* Upload overlay (own profile only) */}
          {isOwnProfile && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div
                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleAvatarClick}
              >
                {uploading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                ) : (
                  <span className="text-white text-sm">Change Photo</span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Image modal */}
        {showImageModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-opacity-70"
                onClick={() => setShowImageModal(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* User info */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{profileUser.name}</h1>
              <p className="text-gray-300 mb-4">{profileUser.email}</p>
              {profileUser.bio && (
                <p className="text-gray-200 mb-4 max-w-2xl">{profileUser.bio}</p>
              )}
            </div>

            {!isOwnProfile && profileUserId && (
              <FollowButton
                userId={profileUserId}
                initialIsFollowing={followerStatus.isFollowing}
                initialFollowerCount={followerStatus.followerCount}
                onFollowChange={onFollowChange}
              />
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <StatBox
              title="Followers"
              value={followerStatus.followerCount}
              link={`/profile/${profileUserId}/followers`}
            />
            <StatBox
              title="Following"
              value={profileUser.following?.length || 0}
              link={`/profile/${profileUserId}/following`}
            />
            <StatBox
              title="Movies"
              value={userMoviesCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;