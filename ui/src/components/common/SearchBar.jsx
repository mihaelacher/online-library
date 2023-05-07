import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchSearchBooks } from "../../store/mutations/bookMutations";
import "./SearchBar.css";

const SearchBar = ({ fetchSearchBooks }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchBooks(searchText);

    if (!window.location.href.endsWith("books")) {
      navigate("/books");
    }
  };

  return (
    <div class="searchBox">
      <input
        onChange={handleSearchChange}
        class="searchInput"
        type="text"
        placeholder="Търси..."
      />
      <button class="searchButton" onClick={handleSearchSubmit}>
        <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchBooks: (params) => dispatch(fetchSearchBooks(params)),
  };
};

export const ConnectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
