import UserList from './UserList';

const FollowingTab = ({ following }) => (
  <UserList users={following} emptyMessage="This user is not following anyone yet." />
);

export default FollowingTab;