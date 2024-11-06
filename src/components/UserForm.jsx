/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function UserForm({ onSubmit, user }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setAge(user.age);
      setGender(user.gender);
    }
  }, [user]);

  const validateForm = () => {
    if (!fullName) {
      setError('Nama tidak boleh kosong');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email tidak valid');
      return false;
    }

    if (age <= 0) {
      setError('Umur harus angka positif ');
      return false;
    } else if (!age) {
      setError('Umur tidak boleh kosong ');
      return false;
    } else {
      setError('');
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ id: user?.id, fullName, email, age, gender });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-lg font-bold text-center">
        {user ? 'Edit Data' : 'Tambah Data'}
      </h2>
      {error && (
        <div className="text-red-500 font-semibold text-center bg-slate-200 py-1 rounded ">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fullname
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default UserForm;
