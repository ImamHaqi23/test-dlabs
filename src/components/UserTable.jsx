/* eslint-disable react/prop-types */

function UserTable({ users, onEdit, onDelete, onSort }) {
  return (
    <div className="overflow-x-auto mt-5">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          {/* Head tabel */}
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Fullname
                <button onClick={() => onSort('fullName')}>🔽</button>
              </th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Age
                <button onClick={() => onSort('age')}>🔽</button>
              </th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {/* Data pengguna */}
          <tbody className="bg-white">
            {users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 uppercase">
                  {user.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex justify-center">
                  <button
                    onClick={() => onEdit(user)}
                    className="mr-2 bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
