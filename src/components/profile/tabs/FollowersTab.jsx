import UserList from './UserList';

const FollowersTab = ({ followers }) => (
  <UserList users={followers} emptyMessage="No one is following this user yet." />
);

export default FollowersTab;