import React from "react";

import UsersList from "../components/users-list";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Edir",
      image: "https://img.icons8.com/bubbles/2x/user.png",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
