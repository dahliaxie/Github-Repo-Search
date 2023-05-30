import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CommitList from './CommitList';
import './App.css';
import { formatDateTime } from './DateTimeFormat';


const RepoList = ({ search, accessToken }) => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [showCommit, setShowCommit] = useState(false);


  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`https://api.github.com/orgs/${search}/repos`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const sortedRepositories = response.data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepositories(sortedRepositories);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };

    if (search) {
      fetchRepositories();
    } else {
      setRepositories([]);
    }
  }, [search, accessToken]);

  const handleRepoClick = (repoName) => {
    setSelectedRepo(repoName);
    setShowCommit(false);
  };

  return (
    <div>
      <h1>{search} Repositories: </h1>
      <div className="accordion" id="accordionExample">
        {repositories.map((repo) => (
          <div className="accordion-item" key={repo.id}>
            <h2 className="accordion-header">
              <button
                className="accordion-button custom-accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${repo.id}`}
                aria-expanded="false"
                aria-controls={`collapse${repo.id}`}
              >
                <h3>{repo.name}</h3>
              </button>
            </h2>
            <div
              id={`collapse${repo.id}`}
              className={`accordion-collapse collapse ${selectedRepo === repo.name ? 'show' : ''}`}
              aria-labelledby={`heading${repo.id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>Language: {repo.language}</p>
                <p>Description: {repo.description}</p>
                <p>Star Count: {repo.stargazers_count}</p>
                <p>Fork Count: {repo.forks_count}</p>
                <p>Date Created: {formatDateTime(repo.created_at)}</p>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#commitList${repo.id}`}
                  aria-expanded="false"
                  aria-controls={`commitList${repo.id}`}
                  onClick={() => {
                    handleRepoClick(repo.name);
                    setShowCommit(!showCommit)
                  }
                  }
                >
                  {selectedRepo === repo.name && showCommit? 'Hide Commits' : 'Show Commits'}
                </button>
                <div
                  id={`commitList${repo.id}`}
                  className={`accordion-collapse collapse ${selectedRepo === repo.name ? 'show' : ''}`}
                  aria-labelledby={`commitListHeading${repo.id}`}
                >
                  {selectedRepo === repo.name && <CommitList repoName={selectedRepo} />}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RepoList.propTypes = {
  search: PropTypes.string.isRequired,
  accessToken: PropTypes.string.isRequired,
};

export default RepoList;
