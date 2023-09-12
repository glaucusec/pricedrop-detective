import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext({});

export default function UserAuthProvider(props) {
  const [cookies, setCookies, removeCookies] = useCookies();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (cookies.user_id && !user.id) {
      setUser({ id: cookies.user_id });
    }
  }, []);

  if (!user && existingSession && user_id) {
    setUser({ token: existingSession, user_id: user_id });
  }

  function setUserHandler(user) {
    setUser(user);
  }

  function setInvalidUserHandler() {
    removeCookies("token");
    removeCookies("user_id");
    setUser({});
  }

  const userCtx = {
    user: user,
    setUserHandler: setUserHandler,
    setInvalidUserHandler: setInvalidUserHandler,
  };

  return (
    <UserContext.Provider value={userCtx}>
      {props.children}
    </UserContext.Provider>
  );
}
