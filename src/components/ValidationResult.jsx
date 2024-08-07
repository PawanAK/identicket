import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function ValidationResult() {
  const location = useLocation();
  const ticketData = location.state?.ticketData;

  // In a real app, you'd validate the ticket data here or in a useEffect
  const isValid = ticketData && ticketData.length > 0;

  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Ticket Validation Result</h1>
      <div className={`p-6 rounded-lg shadow-md ${isValid ? 'bg-green-100' : 'bg-red-100'}`}>
        <p className={`text-2xl font-semibold ${isValid ? 'text-green-700' : 'text-red-700'}`}>
          {isValid ? 'Valid Ticket' : 'Invalid Ticket'}
        </p>
        <p className="mt-2 text-gray-600">
          {isValid ? 'The scanned ticket is valid.' : 'The scanned ticket is not valid or has expired.'}
        </p>
      </div>
      <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
        Scan Another Ticket
      </Link>
    </div>
  );
}

export default ValidationResult;