import React, { useEffect, useState } from "react";
import SearchBar from "../Search/SearchBar";
import { fetchUsersData } from "../../api/api";
import ListingsTable from "../ListingsTable/ListingsTable";
import Pagination from "../Pagination/Pagination";
import "./DashBoard.css";

export default function DashBoard() {
  // STATES:
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isSelectAll, setIsSelectedAll] = useState(false);
  const ITEMS_PER_PAGE = 10;

  // LOGICS:
  function onSearch(e) {
    const value = e.target.value;
    if (!value.startsWith(" ")) setSearchValue(value);
  }

  // PAGINATION LOGIC
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPageUsers = filteredUsers.slice(startIndex, startIndex + 10);

  function handleSearch() {
    const filteredData = users.filter(
      (user) =>
        user.email.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        user.name.toLowerCase().startsWith(searchValue.toLowerCase()) ||
        user.role.toLowerCase().startsWith(searchValue.toLowerCase())
      // here we use startsWith instead of includes as name sujects.
    );

    setFilteredUsers(filteredData);
  }

  // handle select for all for rows
  const toggleSelectAll = (e) => {
    if (isSelectAll) {
      setSelectedRows([]);
    } else {
      const selectedIds = currentPageUsers.map((user) => user.id);
      setSelectedRows(selectedIds);
    }

    setIsSelectedAll(!isSelectAll);
  };

  // handle select for one row
  const handleToggleSelect = (e, id) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedRows((prevState) => [...prevState, id]);
    } else {
      setSelectedRows((prevState) =>
        prevState.filter((userID) => userID !== id)
      );
      // make all select false as one of is unChecked if before its all selected.
      setIsSelectedAll(false);
    }
  };

  // delete the users on click of delete icon
  function handleDelete(id) {
    const updatedData = users.filter((user) => user.id !== id);

    setUsers(updatedData);
    setIsSelectedAll(false);
  }

  // delete row which are selected
  const handleDeleteSelected = () => {
    console.log("updatedUsers");
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setIsSelectedAll(false);
  };

  function handlePageChange(pageNo) {
    setCurrentPage(pageNo);
  }

  // USEEFFECTS:
  useEffect(() => {
    async function fetchAPIData() {
      const res = await fetchUsersData();
      setUsers(res);
      setFilteredUsers(res);
    }

    fetchAPIData();
  }, []);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, searchValue]);

  useEffect(() => {
    setIsSelectedAll(false);
    setSelectedRows([]);
  }, [currentPage]);

  return (
    <div className="dashboard">
      {/* Search */}
      <SearchBar value={searchValue} onSearch={onSearch} />

      {/* ListingsTable */}
      <ListingsTable
        users={currentPageUsers}
        onDelete={handleDelete}
        toggleSelectAll={toggleSelectAll}
        handleToggleSelect={handleToggleSelect}
        isSelectAll={isSelectAll}
        selectedRows={selectedRows}
      />

      {/* Footer */}
      {currentPageUsers.length ? (
        <div className="footer" style={{ position: "relative" }}>
          <button
            className="delete-btn"
            onClick={handleDeleteSelected}
            disabled={!selectedRows.length}
          >
            Delete Selected
          </button>

          <Pagination
            onPageChange={handlePageChange}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : null}
    </div>
  );
}
