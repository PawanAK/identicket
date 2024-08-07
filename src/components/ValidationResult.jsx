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
      <h1 className="text-3xl font-bold mb-6">Ticket Details</h1>
      {isValid && parsedData ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-2 gap-4 text-left">
            <TicketInfo label="Ticket ID" value={parsedData.id} />
            <TicketInfo label="Username" value={parsedData.username} />
            <TicketInfo label="From" value={parsedData.start} />
            <TicketInfo label="To" value={parsedData.end} />
            <TicketInfo label="Type" value={parsedData.dailyPass ? 'Daily Pass' : 'Single Trip'} />
            <TicketInfo label="Price" value={`$${parsedData.price}`} />
            <TicketInfo label="Created At" value={new Date(parsedData.createdAt).toLocaleString()} />
          </div>
          <div className="mt-6 text-center">
            <p className="text-2xl font-semibold text-green-600">Valid Ticket</p>
          </div>
        </div>
      ) : (
        <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold">Invalid Ticket</p>
          <p className="mt-2">The scanned ticket is not valid or has an incorrect format.</p>
        </div>
      )}
      <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
        Scan Another Ticket
      </Link>
    </div>
  );
}

function TicketInfo({ label, value }) {
  return (
    <div className="mb-2">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

export default ValidationResult;