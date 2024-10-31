import React from 'react';
import UserLayout from './UserLayout';

function UserAccount() {
  return (
    <UserLayout>
    <div className="p-8">
      <div className="border-2 border-gray-300 rounded-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">University Program</h2>
        <div className="border-2 border-dotted border-gray-400 p-4 mb-4">
          <h3 className="font-bold">MRST2425YEAR</h3>
          <p>Allowed dates: <span className="font-semibold">Jun 24th, 2024 to Jul 6th, 2025</span></p>
          <p>Ordered on: <span className="font-semibold">Sep 10th, 2024</span></p>
          <p>using <span className="text-blue-600 underline">Credit Card</span></p>
          <div className="flex justify-between items-center mt-4">
            <button className="bg-gray-200 px-4 py-2 rounded-md text-sm">View Receipt</button>
            <span className="bg-green-500 text-white px-4 py-2 rounded-md">Paid</span>
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
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value=""
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  disabled
                />
                <button className="bg-gray-200 px-4 py-2 rounded-md">
                  <i className="fas fa-edit"></i> 
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm">Change your password</label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value=""
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  disabled
                />
                <button className="bg-gray-200 px-4 py-2 rounded-md">
                  <i className="fas fa-edit"></i> 
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm">Change Account Name</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value="University Program"
                  className="border-2 border-gray-300 rounded-md p-2 w-full"
                  disabled
                />
                <button className="bg-gray-200 px-4 py-2 rounded-md">
                  <i className="fas fa-edit"></i> 
                </button>
              </div>
            </div>

            <div>
              <button className="text-blue-600 underline">
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
    </UserLayout>
  );
}

export default UserAccount;
