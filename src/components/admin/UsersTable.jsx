// src/components/admin/UsersTable.jsx
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/formatters';
import { FaCheckCircle, FaTrash, FaUser } from 'react-icons/fa';

const RoleBadge = ({ role }) => {
  const isAdmin = role === 'admin';
  return (
    <button
      className={`px-2 py-1 rounded text-xs flex items-center gap-1 border ${
        isAdmin
          ? 'bg-red-900/50 text-red-300 border-red-700 hover:bg-red-800/50'
          : 'bg-blue-900/50 text-blue-300 border-blue-700 hover:bg-blue-800/50'
      }`}
    >
      {isAdmin ? 'Admin' : 'User'}
      <FaCheckCircle size={10} />
    </button>
  );
};

const UsersTable = ({ users, onDelete, onRoleChange, selectedUsers, onSelectUser, onSelectAll }) => {
  const isProtectedEmail = (email) => email === 'admin@example.com';

  return (
    <div className="bg-[#2A2A2A] rounded-lg shadow-sm overflow-x-auto border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-[#374151]">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedUsers.length === users.length && users.length > 0}
                onChange={onSelectAll}
                className="rounded border-gray-600 bg-[#171717] text-orange-500 focus:ring-orange-500"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Join Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#2A2A2A] divide-y divide-gray-700">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-[#333333] transition">
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => onSelectUser(user._id)}
                  disabled={isProtectedEmail(user.email)}
                  className="rounded border-gray-600 bg-[#171717] text-orange-500 focus:ring-orange-500 disabled:opacity-50"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#374151] rounded-full flex items-center justify-center text-orange-400 border border-gray-600">
                    {user.avatar ? (
                      <img src={user.avatar} alt="" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <div className="ml-3">
                    <Link
                      to={`/profile/${user._id}`}
                      className="text-sm font-medium text-white hover:text-orange-400"
                    >
                      {user.name}
                    </Link>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onRoleChange(user._id, user.role)}
                  disabled={isProtectedEmail(user.email)}
                  className="disabled:opacity-50"
                >
                  <RoleBadge role={user.role} />
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-gray-300">
                {formatDate(user.createdAt, false)}
              </td>
              <td className="px-6 py-4 text-sm">
                <button
                  onClick={() => onDelete(user._id)}
                  disabled={isProtectedEmail(user.email)}
                  className="text-red-400 hover:text-red-300 disabled:opacity-50 flex items-center gap-1"
                >
                  <FaTrash size={14} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;