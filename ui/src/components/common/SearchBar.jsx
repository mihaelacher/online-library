// import React, { useState } from "react";
// import { connect } from "react-redux";

// import { fetchSearchBooks } from "../../store/mutations";
// import MultiSelectDropdown from "./MultiSelectDropdown";
// import Input from "./Input";
// import "./SearchBar.css";

// const SearchBar = ({ fetchSearchBooks }) => {
//   const [searchText, setSearchText] = useState("");

//   const handleSearchChange = (e) => {
//     let params = {};
//     if (Array.isArray(e)) {
//       params.genres = e;
//       params.searchText = searchText;
//     } else {
//       params.genres = selectedOptions;
//       params.searchText = e.target.value;
//       setSearchText(e.target.value);
//     }
//     fetchSearchBooks(params);
//   };

//   const { selectedOptions, MultiSelectComponent } = MultiSelectDropdown({
//     onChangeHandler: handleSearchChange,
//   });

//   return (
//     <div className="header-section">
//       {MultiSelectComponent}
//       <div className="searchbar-container">
//         <div className="searchbar-input">
//           <Input
//             type="text"
//             placeholder="Въведете заглавие/автор на книга"
//             value={searchText}
//             onChange={handleSearchChange}
//           ></Input>
//         </div>
//       </div>
//     </div>
//   );
// };

// function mapStateToProps(state) {
//   return {
//     books: state.books,
//   };
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchSearchBooks(params) {
//       dispatch(fetchSearchBooks(params));
//     },
//   };
// };

import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchSearchBooks } from "../../store/mutations/bookMutations";
import MultiSelectDropdown from "./MultiSelectDropdown";
import "./SearchBar.css";

const SearchBar = ({ fetchSearchBooks }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const { selectedOptions, MultiSelectComponent } = MultiSelectDropdown({
    onChangeHandler: function () {
      return 0;
    },
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = {
      searchText,
      genres: selectedOptions,
    };
    fetchSearchBooks(params);
  };

  return (
    <div class="s003">
      <form>
        <div class="inner-form">
          <div class="input-field first-wrap">
            <div class="input-select">{MultiSelectComponent}</div>
          </div>
          <div class="input-field second-wrap">
            <input id="search" type="text" placeholder="Enter Keywords?" />
          </div>
          <div class="input-field third-wrap">
            <button class="btn-search" type="button">
              <svg
                class="svg-inline--fa fa-search fa-w-16"
                aria-hidden="true"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
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
