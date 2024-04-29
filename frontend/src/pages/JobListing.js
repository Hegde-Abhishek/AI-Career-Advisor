import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [userPreferences, setUserPreferences] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10); // Number of jobs per page

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    // Fetch user preferences and update the state
    axios.get(`http://127.0.0.1:5000/api/users/profile/${userId}`).then(response => {
      setUserPreferences(response.data.preferences.join(','));
    }).catch(error => {
      console.error('Error fetching user profile:', error);
    });

  }, []);

  useEffect(() => {
    fetchJobs(userPreferences, locationFilter, currentPage);
  }, [userPreferences, locationFilter, currentPage]);

  const fetchJobs = async (preferences, location, page) => {
    const queryParams = new URLSearchParams({
      preferences,
      location,
      page,
      limit: jobsPerPage,
    });

    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/jobs?${queryParams}`);
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages); // Set the total pages
    } catch (error) {
      console.error('Error fetching job listings:', error);
    }
  };

  const handlePreferencesChange = (e) => {
    setUserPreferences(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleLocationChange = (e) => {
    // setLocationFilter(e.target.value);
    // setLocationFilter(e.target.checked ? "Remote" : "");
    setLocationFilter(prevFilter => (prevFilter === "Remote" ? "" : "Remote"));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="job-list">
      <h2 className="job-list-heading">Personalized Job Listings</h2>
      <input
        type="text"
        value={userPreferences}
        onChange={handlePreferencesChange}
        placeholder="Enter preferences to filter jobs"
        style={{ marginLeft: '42px' }}
      />
      <label className="remoteRadio">
        <input
          type="checkbox" // Changed from radio to checkbox to allow uncheck
          checked={locationFilter === "Remote"}
          onChange={handleLocationChange}
        />
        Remote only
      </label>
      <ul className="job-cards">
        {jobs.map((job, index) => (
          <li key={index} className="job-card">
            <h3 className="job-card-title">{job.title}</h3>
            <div>{job.company}</div>
            <div>{job.location}</div>
            <a href={job.applicationLink} className="job-link" target="_blank" rel="noopener noreferrer">
              View Job
            </a>
            <div>Date Posted: {new Date(job.datePosted).toLocaleDateString()}</div>
            <div><strong>Why matched:</strong> {job.explanation}</div>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <div className="pagination" style={{ marginLeft: '40px', marginTop: '20px' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default JobListing;


