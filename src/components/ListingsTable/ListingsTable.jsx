import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import "./ListingsTable.css";

export default function ListingsTable({
  users,
  onDelete,
  toggleSelectAll,
  handleToggleSelect,
  isSelectAll,
  selectedRows,
}) {
  return (
    <div className="table-container">
      <table className="table-content">
        <thead>
          <tr>
            <th width="10%">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={isSelectAll}
              />
            </th>
            <th width="25%">Name</th>
            <th width="40%">Email</th>
            <th width="15%">Role</th>
            <th width="10%">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => handleToggleSelect(e, user.id)}
                  checked={selectedRows.includes(user.id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td style={{ textTransform: "capitalize" }}>{user.role}</td>
              <td className="action-btn">
                <FaRegEdit className="edit-icon" />
                <AiOutlineDelete
                  className="delete-icon"
                  onClick={() => onDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!users.length ? (
        <div style={{ textAlign: "center", margin: "30px", fontWeight: "500" }}>
          No User Found ☹️
        </div>
      ) : null}
    </div>
  );
}
