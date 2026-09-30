// src/components/admin/AdminUsers.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser, updateUserRole } from '@/services/admin';
import { formatDate } from '@/utils/formatters';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import UsersTable from './UsersTable';
import { FaSearch, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  const fetchUsers = async (currentPage = page, search = searchTerm) => {
    try {
      setLoading(true);
      const response = await getUsers({
        page: currentPage,
        limit: 10,
        search: search || undefined,
      });
      if (response.success) {
        setUsers(response.users || []);
        setTotalPages(response.totalPages || 1);
        setSelectedUsers([]);
      }
    } catch (err) {
      setError(err.message || 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers(1, searchTerm);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      alert(err.message || 'Error deleting user');
    }
  };

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!window.confirm(`Change role to "${newRole === 'admin' ? 'Admin' : 'User'}"?`)) return;
    try {
      const response = await updateUserRole(userId, newRole);
      if (response.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, role: response.user.role } : u
          )
        );
      }
    } catch (err) {
      alert(err.message || 'Error changing role');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((u) => u._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    if (!window.confirm(`Delete ${selectedUsers.length} selected users?`)) return;
    setBulkDeleteLoading(true);
    try {
      await Promise.all(selectedUsers.map((id) => deleteUser(id)));
      setUsers((prev) => prev.filter((u) => !selectedUsers.includes(u._id)));
      setSelectedUsers([]);
    } catch (err) {
      alert(err.message || 'Error during bulk delete');
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  if (loading && users.length === 0) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white">User Management</h2>
        <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email..."
            className="flex-1 px-4 py-2 bg-[#374151] border border-gray-600 rounded-l-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 flex items-center gap-2"
          >
            <FaSearch />
            Search
          </button>
        </form>
      </div>

      {error && <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">{error}</div>}

      {selectedUsers.length > 0 && (
        <div className="bg-[#374151] p-4 rounded-lg border border-gray-600 flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            {selectedUsers.length} user(s) selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={bulkDeleteLoading}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            <FaTrash />
            {bulkDeleteLoading ? 'Deleting...' : 'Delete Selected'}
          </button>
        </div>
      )}

      <UsersTable
        users={users}
        onDelete={handleDelete}
        onRoleChange={handleRoleChange}
        selectedUsers={selectedUsers}
        onSelectUser={handleSelectUser}
        onSelectAll={handleSelectAll}
      />

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2 bg-[#2A2A2A] border border-gray-600 text-gray-300 rounded-lg hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaChevronLeft />
          </button>
          <span className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            {page}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2 bg-[#2A2A2A] border border-gray-600 text-gray-300 rounded-lg hover:bg-[#374151] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;