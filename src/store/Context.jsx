import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api';

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {

  //find the token in the localstorage
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;

  //store the token
  const [token, setToken] = useState(getToken);

  //store the current loggedin user
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("USER"));
    console.log(user)


    try {
      const { data } = await api.get(`/auth/user`);
      const roles = data.roles;
      console.log(roles)
      console.log(data)
      setCurrentUser(data);


      if (roles.includes("ROLE_ADMIN")) {
        localStorage.setItem("IS_ADMIN", JSON.stringify(true));
        // setIsAdmin(true);
      } else {
        localStorage.removeItem("IS_ADMIN");
        // setIsAdmin(false);
      }

    } catch (error) {
      console.error("Error fetching current user", error);
      // toast.error("Error fetching current user");
    }

  };

  //if  token exist fetch the current user
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);




  return <ContextApi.Provider
    value={{
      token,
      setToken,
      currentUser,
      setCurrentUser,
    }}>{children}</ContextApi.Provider>
}

export const useMyContext = () => {
  const context = useContext(ContextApi);

  return context;
};
