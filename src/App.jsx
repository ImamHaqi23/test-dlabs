import UserTable from './components/UserTable'; // Komponen tabel User untuk menampilkan data
import UserForm from './components/UserForm'; // Komponen form untuk menambahkan atau mengedit User
import Modal from './components/Modal'; // Komponen modal untuk menampilkan form dalam jendela pop-up
import { useUserContext } from './hooks/useUserContext'; // Menggunakan context untuk menyimpan dan mengelola state global

function App() {
  const { state, dispatch } = useUserContext(); // Mengakses state dan dispatch dari context

  // Fungsi untuk menambahkan User baru
  const handleAdd = (user) => {
    // Menghasilkan ID User baru
    const newUserId =
      state.users.length > 0 ? state.users[state.users.length - 1].id + 1 : 1;
    const newUser = { ...user, id: newUserId };
    const updatedUsers = [...state.users, newUser];
    // Simpan ke local storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    // Dispatch aksi untuk menambahkan User
    dispatch({ type: 'ADD_USER', payload: newUser });
  };

  // Fungsi untuk mengedit data User
  const handleEdit = (updatedUser) => {
    const updatedUsers = state.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Simpan perubahan ke local storage
    dispatch({ type: 'EDIT_USER', payload: updatedUser }); // Dispatch aksi untuk mengedit User
  };

  // Fungsi untuk menghapus User
  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_USER', payload: id }); // Dispatch aksi penghapusan
    const updatedUsers = state.users.filter((user) => user.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Update local storage
  };

  // Fungsi untuk mengurutkan data berdasarkan key tertentu (misalnya, Fullname atau age)
  const handleSort = (key) => {
    const order =
      state.sortDirection.key === key && state.sortDirection.order === 'asc'
        ? 'desc'
        : 'asc';
    const sortedUsers = [...state.users].sort((a, b) => {
      if (key === 'fullName')
        return order === 'asc'
          ? a.fullName.localeCompare(b.fullName)
          : b.fullName.localeCompare(a.fullName);
      if (key === 'age') return order === 'asc' ? a.age - b.age : b.age - a.age;
      return 0;
    });
    dispatch({ type: 'SET_USERS', payload: sortedUsers }); // Update state dengan data yang sudah diurutkan
    dispatch({ type: 'SET_SORT_DIRECTION', payload: { key, order } });
  };

  // Filter User berdasarkan Fullname dan gender
  const filteredUsers = state.users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(state.searchName.toLowerCase()) &&
      (!state.searchGender ||
        user.gender.toLowerCase() === state.searchGender.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        DataTech Dashboard
      </h1>
      <button
        onClick={() => dispatch({ type: 'SET_MODAL_OPEN', payload: true })}
        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add User
      </button>

      {/* Pencarian dan filter berdasarkan Fullname dan gender */}
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search by name"
          value={state.searchName}
          onChange={(e) =>
            dispatch({ type: 'SET_SEARCH_NAME', payload: e.target.value })
          }
          className="p-2 border rounded-md"
        />
        <select
          value={state.searchGender}
          onChange={(e) =>
            dispatch({ type: 'SET_SEARCH_GENDER', payload: e.target.value })
          }
          className="p-2 border rounded-md"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Menampilkan loading, error, atau tabel data User */}
      {state.loading ? (
        <div>Loading...</div>
      ) : state.error ? (
        <div className="text-red-500">{state.error}</div>
      ) : (
        <UserTable
          users={filteredUsers}
          onEdit={(user) =>
            dispatch({ type: 'SET_EDITING_USER', payload: user })
          }
          onDelete={handleDelete}
          onSort={handleSort}
        />
      )}

      {/* Modal untuk menampilkan form tambah/edit User */}
      {state.isModalOpen && (
        <Modal
          onClose={() => dispatch({ type: 'SET_MODAL_OPEN', payload: false })}
        >
          <UserForm
            onSubmit={state.editingUser ? handleEdit : handleAdd}
            user={state.editingUser}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
