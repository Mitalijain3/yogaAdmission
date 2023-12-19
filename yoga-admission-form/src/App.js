import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AdmissionForm from './components/AdmissionForm';
import Error from './components/Error';
import Payment from './components/Payment';
import ChangeBatch from './components/ChangeBatch';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/form" element={<AdmissionForm />} />
          <Route path="/error" element={<Error />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/changeBatch" element={<ChangeBatch />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
