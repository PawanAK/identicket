import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function ValidationResult() {
  const location = useLocation();
  const ticketData = location.state?.ticketData;

  let parsedData;
  let isValid = false;

  try {
    parsedData = JSON.parse(ticketData);
    isValid = parsedData && parsedData.id && parsedData.username;
  } catch (error) {
    console.error('Error parsing ticket data:', error);
  }

  return (
    <div className="max-w-md mx-auto text-center p-6">
      <h1 className="text-3xl font-bold mb-6">Ticket Validation Result</h1>
      <div className={`p-6 rounded-lg shadow-md ${isValid ? 'bg-green-100' : 'bg-red-100'}`}>
        <p className={`text-2xl font-semibold mb-4 ${isValid ? 'text-green-700' : 'text-red-700'}`}>
          {isValid ? 'Valid Ticket' : 'Invalid Ticket'}
        </p>
        {isValid && parsedData && (
          <div className="text-left">
            <TicketInfo label="Ticket ID" value={parsedData.id} />
            <TicketInfo label="Username" value={parsedData.username} />
            <TicketInfo label="From" value={parsedData.start} />
            <TicketInfo label="To" value={parsedData.end} />
            <TicketInfo label="Type" value={parsedData.dailyPass ? 'Daily Pass' : 'Single Trip'} />
            <TicketInfo label="Price" value={`$${parsedData.price}`} />
            <TicketInfo label="Created At" value={new Date(parsedData.createdAt).toLocaleString()} />
          </div>
        )}
        {!isValid && (
          <p className="text-red-600">
            The scanned ticket is not valid or has an incorrect format.
          </p>
        )}
      </div>
      <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
        Scan Another Ticket
      </Link>
    </div>
  );
}

function TicketInfo({ label, value }) {
  return (
    <div className="mb-2">
      <span className="font-semibold">{label}:</span> <span className="ml-2">{value}</span>
    </div>
  );
}

export default ValidationResult;