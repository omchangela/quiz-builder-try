import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get('/quizzes/analytics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnalyticsData(response.data);
      } catch (err) {
        console.error('Error fetching analytics data', err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div>
      <h2>Quiz Analytics</h2>
      {analyticsData.length === 0 ? (
        <p>No analytics data available.</p>
      ) : (
        <ul>
          {analyticsData.map((data) => (
            <li key={data.quizId}>
              Quiz ID: {data.quizId}<br />
              Completions: {data.completions}<br />
              Average Score: {data.averageScore.toFixed(2)}<br />
              Responses: {data.responses.length}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Analytics;
