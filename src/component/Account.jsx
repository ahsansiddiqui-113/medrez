import React, { useState } from 'react';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

function Account() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountName, setAccountName] = useState('University Program');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [paymentMethod] = useState('Credit Card');
  const [paymentStatus] = useState('Paid');
  const [receiptDetails] = useState({
    date: 'Sep 10th, 2024',
    amount: '$299',
    orderId: 'MRST2425YEAR',
    period: 'Jun 24th, 2024 to Jul 6th, 2025'
  });

  const navigate = useNavigate();

  const handleViewReceipt = () => {
    setShowReceiptModal(true);
  };

  const handleCloseReceiptModal = () => {
    setShowReceiptModal(false);
  };

  const handleViewTerms = () => {
    navigate('/terms');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAccountNameChange = (e) => {
    setAccountName(e.target.value);
  };

  const handleChange = (field) => {
    switch (field) {
      case 'email':
        console.log('Email changed:', email);
        break;
      case 'password':
        console.log('Password changed:', password);
        break;
      case 'accountName':
        console.log('Account name changed:', accountName);
        break;
      default:
        console.log('Unknown field:', field);
    }
  };

  const handleCancel = (field) => {
    switch (field) {
      case 'email':
        setEmail('');
        break;
      case 'password':
        setPassword('');
        break;
      case 'accountName':
        setAccountName('University Program');
        break;
      default:
        console.log('Unknown field:', field);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="border-2 border-gray-300 rounded-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">University Program</h2>
          <div className="border-2 border-dotted border-gray-400 p-4 mb-4">
            <h3 className="font-bold">{receiptDetails.orderId}</h3>
            <p>Allowed dates: <span className="font-semibold">{receiptDetails.period}</span></p>
            <p>Ordered on: <span className="font-semibold">{receiptDetails.date}</span></p>
            <p>using <span className="text-blue-600 underline">{paymentMethod}</span></p>
            <div className="flex justify-between items-center mt-4">
              <button onClick={handleViewReceipt} className="bg-gray-200 px-4 py-2 rounded-md text-sm">View Receipt</button>
              <button className={`px-4 py-2 rounded-md ${paymentStatus === 'Paid' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {paymentStatus}
              </button>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-300 rounded-md p-6 mb-6">
          <h2 className="font-bold text-xl mb-4">FREETRIAL</h2>
          <p>Allowed dates: <span className="font-semibold">Sep 1st, 2024 to Nov 2nd, 2024</span></p>
          <p className="text-gray-500 mt-2">No Order Information</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="font-bold text-lg mb-4">Account options:</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm">Change email</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                  />
                  <div className="flex gap-4 mt-2">
                    <button onClick={() => handleChange('email')} className="bg-gray-200 px-4 py-2 rounded-md">
                      <i className="fas fa-edit"></i> Change Email
                    </button>
                    <button onClick={() => handleCancel('email')} className="bg-gray-200 px-4 py-2 rounded-md">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm">Change your password</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                  />
                  <div className="flex gap-4 mt-2">
                    <button onClick={() => handleChange('password')} className="bg-gray-200 px-4 py-2 rounded-md">
                      <i className="fas fa-edit"></i> Change Password
                    </button>
                    <button onClick={() => handleCancel('password')} className="bg-gray-200 px-4 py-2 rounded-md">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm">Change Account Name</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={accountName}
                    onChange={handleAccountNameChange}
                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                  />
                  <div className="flex gap-4 mt-2">
                    <button onClick={() => handleChange('accountName')} className="bg-gray-200 px-4 py-2 rounded-md">
                      <i className="fas fa-edit"></i> Change Account Name
                    </button>
                    <button onClick={() => handleCancel('accountName')} className="bg-gray-200 px-4 py-2 rounded-md">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <button onClick={handleViewTerms} className="text-blue-600 underline">
                  View Terms of Service
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-md">
            <h2 className="font-bold text-lg mb-2">Customer Support</h2>
            <p><span className="font-semibold">Email:</span> support@MedRez.net</p>
            <p className="text-gray-500 mt-2">
              Support is available during regular West Coast business hours.
            </p>
          </div>
        </div>
      </div>

      {showReceiptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-lg font-bold mb-4">Receipt Details</h2>
            <p><strong>Order ID:</strong> {receiptDetails.orderId}</p>
            <p><strong>Date:</strong> {receiptDetails.date}</p>
            <p><strong>Amount:</strong> {receiptDetails.amount}</p>
            <p><strong>Allowed Period:</strong> {receiptDetails.period}</p>
            <button
              onClick={handleCloseReceiptModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Account;
