import React, { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext({});

export default function UserAuthProvider(props) {
  const [cookies, setCookies] = useCookies();
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

  const userCtx = {
    user: user,
    setUserHandler: setUserHandler,
  };

  return (
    <UserContext.Provider value={userCtx}>
      {props.children}
    </UserContext.Provider>
  );
}
