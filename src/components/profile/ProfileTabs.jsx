/**
 * Profile tabs bar
 * @param {Object} props
 * @param {string} props.activeTab - Active tab (profile, movies, followers, following)
 * @param {Function} props.onTabChange - Tab change handler
 * @param {Object} props.counts - Item counts for each tab
 */
const ProfileTabs = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'movies', label: `Movies (${counts.movies})` },
    { id: 'followers', label: `Followers (${counts.followers})` },
    { id: 'following', label: `Following (${counts.following})` }
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs;