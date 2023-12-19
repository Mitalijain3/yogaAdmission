import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import your CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Yoga Classes!</h1>
      <p className="intro-text">What would you like to do?</p>

      <div className="action-card enroll-card">
        <h2>Enroll for Monthly Classes</h2>
        <p>
          Interested in enrolling for our monthly classes? Click{' '}
          <Link to="/form">here</Link> to get started.
        </p>
      </div>

      <div className="action-card change-batch-card">
        <h2>Change Batch</h2>
        <p>
          Already enrolled and want to change your batch? Click{' '}
          <Link to="/changeBatch">here</Link> to make changes.
        </p>
      </div>
    </div>
  );
};

export default Home;
