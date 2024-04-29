import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Charts from '../components/Charts';

const DataVisualization = () => {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/jobs')
      .then(response => setJobData(response.data))
      .catch(error => console.error('Error fetching job data:', error));
  }, []);

  const getJobCountsByLocation = () => {
    const jobCountsByLocation = {};
    jobData.forEach(job => {
      const location = job.location;
      jobCountsByLocation[location] = (jobCountsByLocation[location] || 0) + 1;
    });
    return jobCountsByLocation;
  };

  const getTopSkills = () => {
    const skillCounts = {};
    jobData.forEach(job => {
      job.skills.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
    });
    return Object.entries(skillCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  };

  const jobCountsByLocation = getJobCountsByLocation();
  const topSkills = getTopSkills();

  // Ensure datasets for Charts are structured correctly
  const locationChartData = {
    labels: Object.keys(jobCountsByLocation),
    datasets: [{
      label: 'Job Counts',
      data: Object.values(jobCountsByLocation),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }]
  };

  const skillsChartData = {
    labels: topSkills.map(([skill]) => skill),
    datasets: [{
      label: 'Top Skills',
      data: topSkills.map(([, count]) => count),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    }]
  };

  return (
    <div>
      <h2>Data Visualization</h2>
      <div className="charts">
        <div className="chart">
          <h3>Job Counts by Location</h3>
          <Charts type="bar" data={locationChartData} />
        </div>
        <div className="chart">
          <h3>Top Skills</h3>
          <Charts type="pie" data={skillsChartData} />
        </div>
      </div>
    </div>
  );
}

export default DataVisualization;
