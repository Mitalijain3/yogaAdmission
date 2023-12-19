import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AdmissionForm from './components/AdmissionForm';
import Error from './components/Error';
import Payment from './components/Payment';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/error">Error</Link>
            </li>
            <li>
              <Link to="/payment">Payment</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Route exact path="/" component={AdmissionForm} />
        <Route path="/error" component={Error} />
        <Route path="/payment" component={Payment} />
      </div>
    </Router>
  );
};

export default App;
