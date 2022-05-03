import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../store/users";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => {
    return {
      users: state.usersReducer,
    };
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <table>
      <tbody>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>email</th>
        </tr>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AllUsers;
