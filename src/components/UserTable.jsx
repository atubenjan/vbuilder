import React, { useEffect, useState } from 'react';
import axios from 'axios';

const columns = [
  { id: 'UserId', label: 'User ID', minWidth: 170 },
  { id: 'Username', label: 'User Name', minWidth: 170 },
  { id: 'Email', label: 'Email', minWidth: 170 },
  { id: 'Role', label: 'Role', minWidth: 100 },
  { id: 'Organization', label: 'Organization', minWidth: 170 },
];

const UserTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored on login
        const response = await axios.get('http://localhost:5000/users', {
          headers: { 'x-auth-token': token },
        });
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="w-full p-2 pb-5 bg-white rounded-lg">
      <h2 className="mb-4 text-2xl font-semibold">User Management</h2>
      <div className="overflow-x-auto bg-white">
        <table className="min-w-full border border-collapse border-gray-300 table-auto">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-3 text-left border-b-2 border-b-gray-300"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <td
                        key={column.id}
                        className="px-4 py-2 border border-gray-300"
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <label htmlFor="rowsPerPage" className="mr-2">
            Users per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className={`px-3 py-1 cursor-pointer rounded ${
              page === 0
                ? 'bg-gray-200'
                : 'bg-blue-500 hover:bg-gray-200 text-white'
            }`}
          >
            Prev
          </button>
          <span>
            {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
          </span>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
            className={`px-3 py-1 cursor-pointer rounded ${
              page >= Math.ceil(rows.length / rowsPerPage) - 1
                ? 'bg-gray-200'
                : 'bg-blue-500 hover:bg-gray-200 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
