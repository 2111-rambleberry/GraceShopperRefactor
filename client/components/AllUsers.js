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

  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <table>
      <tbody className="user-table headers">
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>email</th>
          <th>Edit</th>
        </tr>
        {users.map((user) => {
          return (
            <tr
              className="user-table rows"
              key={user.id}
              style={{
                backgroundColor: user.id === hoveredRow ? "#efefef" : "white",
              }}
            >
              <td>{user.username}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>
                <button
                  onMouseEnter={(e) => {
                    setHoveredRow(user.id);
                  }}
                  onMouseLeave={(e) => {
                    setHoveredRow(null);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AllUsers;
