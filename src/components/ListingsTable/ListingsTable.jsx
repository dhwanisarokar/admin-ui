import React, { useEffect, useState } from "react";
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
  onSave,
}) {
  const [editableRow, setEditableRow] = useState(null);
  const [editedUser, setEditedUser] = useState(null);

  function handleEdit({ id, name, email, role }) {
    setEditableRow(id);
    setEditedUser({ name, email, role });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setEditedUser((prevState) => ({ ...prevState, [name]: value }));
  }

  function onCancel() {
    setEditableRow(null);
    setEditedUser(null);
  }

  useEffect(() => {
    setEditableRow(null);
    setEditedUser(null);
  }, [users]);

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
            <th width="33%">Email</th>
            <th width="17%">Role</th>
            <th width="15%">Actions</th>
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
              <td>
                {editableRow === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editableRow === user.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td style={{ textTransform: "capitalize" }}>
                {editableRow === user.id ? (
                  <input
                    type="text"
                    name="role"
                    value={editedUser.role}
                    onChange={handleInputChange}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="action-btn">
                {editableRow === user.id ? (
                  <div className="edit-button">
                    <button
                      className="save-button"
                      onClick={() => onSave(editedUser, user.id)}
                    >
                      Save
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <FaRegEdit
                      className="edit-icon"
                      onClick={() => handleEdit(user)}
                    />
                    <AiOutlineDelete
                      className="delete-icon"
                      onClick={() => onDelete(user.id)}
                    />
                  </>
                )}
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
