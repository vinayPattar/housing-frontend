import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api';

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {

  //find the token in the localstorage
  const getToken = localStorage.getItem("JWT_TOKEN")
    ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
    : null;


  const isAdmin = localStorage.getItem("IS_ADMIN")
    && JSON.stringify(localStorage.getItem("IS_ADMIN"));

  const isSeller = localStorage.getItem("IS_SELLER")
    && JSON.stringify(localStorage.getItem("IS_SELLER"));
  //store the token
  const [token, setToken] = useState(getToken);

  const [Admin, setAdmin] = useState(isAdmin);

  const [seller, setSeller] = useState(isSeller);

  //store the current loggedin user
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    const user = JSON.parse(localStorage.getItem("USER"));
    console.log(user)


    try {
      const { data } = await api.get(`/auth/user`);
      const roles = data.roles;
      console.log(data)

      if (roles.includes("ROLE_ADMIN")) {
        localStorage.setItem("IS_ADMIN", JSON.stringify(true));
        setAdmin(true);
      } else if (roles.includes("ROLE_ADMIN")) {
        localStorage.setItem("IS_SELLER", JSON.stringify(true));
        setSeller(true);
      } else {
        localStorage.removeItem("IS_ADMIN");
        localStorage.removeItem("IS_SELLER");
        setAdmin(false);
        setSeller(false);

        console.log(data)
      }
      setCurrentUser(data);

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
