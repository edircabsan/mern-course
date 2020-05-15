import React, { useEffect, useState } from "react";

import UsersList from "../components/users-list";
import ErrorModal from "../../shared/components/ui-elements/error-modal";
import LoadingSpinner from "../../shared/components/ui-elements/loading-spinner";
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      //do not use async function as an useEffect argument (class 149)

      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users");
        setLoadedUsers(responseData.users);
      } catch (err) {
        //Nothing to do
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
