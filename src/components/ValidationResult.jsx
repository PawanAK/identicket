import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function ValidationResult() {
  const location = useLocation();
  const ticketData = location.state?.ticketData;

  return (
    <div className="max-w-md mx-auto text-center p-6">
      <h1 className="text-3xl font-bold mb-6">Scanned QR Data</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <pre className="text-left whitespace-pre-wrap break-words">
          {ticketData}
        </pre>
      </div>
      <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
        Scan Another Ticket
      </Link>
    </div>
  );
}

export default ValidationResult;