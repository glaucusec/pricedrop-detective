import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export default function UserAuthProvider(props) {
  const [user, setUser] = useState({});

  function updateUser(user) {
    setUser(user);
  }

  const userCtx = {
    user: user,
    updateUser: updateUser,
  };

  return (
    <UserContext.Provider value={userCtx}>
      {props.children}
    </UserContext.Provider>
  );
}
