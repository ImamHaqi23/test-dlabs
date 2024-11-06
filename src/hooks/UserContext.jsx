/* eslint-disable react/prop-types */

import { useReducer, useEffect } from 'react';
import { fetchUsers } from '../services/api';
import { UserContext } from './useUserContext';

// State awal aplikasi
const initialState = {
  users: [],
  editingUser: null,
  isModalOpen: false,
  loading: true,
  error: null,
  sortDirection: { key: '', order: 'asc' },
  searchName: '',
  searchGender: '',
};

// Reducer untuk mengelola berbagai aksi di aplikasi
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
        isModalOpen: false,
      };
    case 'EDIT_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        editingUser: null,
        isModalOpen: false,
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case 'SET_EDITING_USER':
      return { ...state, editingUser: action.payload, isModalOpen: true };
    case 'SET_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SEARCH_NAME':
      return { ...state, searchName: action.payload };
    case 'SET_SEARCH_GENDER':
      return { ...state, searchGender: action.payload };
    case 'SET_SORT_DIRECTION':
      return { ...state, sortDirection: action.payload };
    default:
      return state;
  }
};

// Provider untuk menyediakan state dan dispatch ke seluruh komponen aplikasi
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Fetch data pengguna saat aplikasi pertama kali dibuka
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.length > 0) {
      dispatch({ type: 'SET_USERS', payload: storedUsers });
    } else {
      fetchUsers()
        .then((data) => {
          const formattedUsers = data.map((user) => ({
            id: user.id,
            fullName: `${user.firstName} ${user.lastName}`,
            email: user.email,
            age: user.age,
            gender: user.gender,
          }));
          localStorage.setItem('users', JSON.stringify(formattedUsers));
          dispatch({ type: 'SET_USERS', payload: formattedUsers });
        })
        .catch((err) => {
          dispatch({
            type: 'SET_ERROR',
            payload: `Error fetching users: ${err.message}`,
          });
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
