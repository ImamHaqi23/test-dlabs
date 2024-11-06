import { useContext, createContext } from 'react';

export const useUserContext = () => useContext(UserContext);

export const UserContext = createContext();
