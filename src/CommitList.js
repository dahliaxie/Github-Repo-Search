import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CommitList = ({ repoName }) => {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/Netflix/${repoName}/commits`);
        const sortedCommits = response.data.sort((a, b) => new Date(b.commit.author.date) - new Date(a.commit.author.date));
        setCommits(sortedCommits);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    fetchCommits();
  }, [repoName]);
  
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  return (
    <div className="mt-4">
      <h2>Commits for Repository: {repoName}</h2>
      <ul className="list-group">
        {commits.map((commit) => (
          <li key={commit.sha} className="list-group-item">
            <div className="commit-item-container text-break">
              <p>Commit Message: {commit.commit.message}</p>
              <p>Committer Username: {commit.commit.author.name}</p>
              <p>Commit Hash: {commit.sha}</p>
              <p>Date Created: {formatDateTime(commit.commit.author.date)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

CommitList.propTypes = {
  repoName: PropTypes.string.isRequired,
};

export default CommitList;
