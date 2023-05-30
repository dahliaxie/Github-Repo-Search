import React, { useState } from 'react';
import RepoList from './RepoList';
import './App.css'

function App() {
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const accessToken = "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"


  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Search for a GitHub organization</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSearchSubmit}>
            <div className="mb-3">
              <label htmlFor="githubOrgSearch" className="form-label">
                Search for GitHub organization
              </label>
              <input
                value={searchInput}
                onChange={handleSearchChange}
                type="text"
                className="form-control"
                id="githubOrgSearch"
                placeholder="Search for a GitHub Organization"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4">
        <RepoList search={search} accessToken={accessToken} />
      </div>
    </div>
  );
}

export default App;
