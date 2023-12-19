// Payment.jsx
import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);

  const handlePaymentModeChange = (mode) => {
    setSelectedPaymentMode(mode);
  };

  const handlePaymentSubmit = () => {
    console.log('Payment submitted for mode:', selectedPaymentMode);
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <p>Thank you for enrolling! Please proceed with the payment of 500Rs.</p>

      <div className="payment-modes">
        <label>
          <input
            type="radio"
            value="card"
            checked={selectedPaymentMode === 'card'}
            onChange={() => handlePaymentModeChange('card')}
          />
          Card
        </label>
        <label>
          <input
            type="radio"
            value="upi"
            checked={selectedPaymentMode === 'upi'}
            onChange={() => handlePaymentModeChange('upi')}
          />
          UPI
        </label>
      </div>

      {selectedPaymentMode && (
        <div className="payment-details">
          {selectedPaymentMode === 'card' && (
            <div>
              <h3>Card Details</h3>
            </div>
          )}
          {selectedPaymentMode === 'upi' && (
            <div>
              <h3>UPI Details</h3>
            </div>
          )}
        </div>
      )}

      <button onClick={handlePaymentSubmit}>Submit Payment</button>
    </div>
  );
};

export default Payment;
