import axios from 'axios';

// Fungsi untuk mengambil data pengguna dari API
export const fetchUsers = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    // Kembalikan hanya data pengguna
    return response.data.users;
  } catch (error) {
    throw new Error(error + 'Gagal mengambil data pengguna');
  }
};
