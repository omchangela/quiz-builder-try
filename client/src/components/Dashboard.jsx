// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/api/dashboard', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      setUser(res.data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.username}</h1>
          <p>Your Email: {user.email}</p>
          <h2>Your Quizzes</h2>
          {user.createdQuizzes.length > 0 ? (
            <ul>
              {user.createdQuizzes.map((quiz) => (
                <li key={quiz._id}>{quiz.title}</li>
              ))}
            </ul>
          ) : (
            <p>You haven't created any quizzes yet.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
