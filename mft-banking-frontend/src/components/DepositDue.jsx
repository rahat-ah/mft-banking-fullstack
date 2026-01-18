import React from 'react'

import { useState } from "react";

export default function DepositDue() {
  const [open, setOpen] = useState(false);
  const dueAmount = 5000; // example due amount

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Pay Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Pay
      </button>

      {/* Popup Overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          {/* Card */}
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 relative">
            {/* Header */}
            <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
              Deposit Money
            </h2>

            {/* Due Amount */}
            <div className="mb-4 text-center">
              <p className="text-sm text-gray-500">Due Amount</p>
              <p className="text-2xl font-bold text-orange-500">৳ {dueAmount}</p>
            </div>

            {/* Input */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Enter Amount
              </label>
              <input
                type="number"
                placeholder="Enter deposit amount"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
