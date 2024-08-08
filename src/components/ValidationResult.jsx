import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function ValidationResult() {
  const location = useLocation();
  const ticketData = location.state?.ticketData;
  const [validationStatus, setValidationStatus] = useState(null);

  let parsedData;
  try {
    parsedData = JSON.parse(ticketData);
  } catch (error) {
    console.error('Error parsing ticket data:', error);
  }

  useEffect(() => {
    const validateTicket = async () => {
      try {
        const response = await axios.post('https://92bc-103-216-232-99.ngrok-free.app/validate_otp', {
          party_ids_to_store_ids: parsedData.storeId,
          program_id: parsedData.computeId,
          seed: parsedData.username,
          otp: parsedData.otp,
        });

        const { data } = response.data;
        if (data.isvalid === 1) {
          // Update the ticket validation status on the server
          await axios.post(`https://ticket-backend-j37d.onrender.com/ticket/${parsedData.ticketId}/validate`);
          setValidationStatus(true);
        } else {
          setValidationStatus(false);
        }
      } catch (error) {
        console.error('Error validating ticket:', error);
        setValidationStatus(false);
      }
    };

    validateTicket();
  }, [parsedData]);

  return (
    <div className="max-w-md mx-auto text-center p-6">
      <h1 className="text-3xl font-bold mb-6">Ticket Details</h1>
      {parsedData ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-left">
          <div className="grid grid-cols-2 gap-4">
            <DataField label="Ticket ID" value={parsedData.ticketId} />
            <DataField label="Username" value={parsedData.username} />
            <DataField label="From" value={parsedData.start} />
            <DataField label="To" value={parsedData.end} />
            <DataField label="Price" value={`$${parsedData.price}`} />
            <DataField label="Created At" value={new Date(parsedData.createdAt).toLocaleString()} />
            <DataField
              label="Validation Status"
              value={validationStatus === true ? 'Valid' : validationStatus === false ? 'Invalid' : 'Validating...'}
              className={validationStatus === true ? 'text-green-600' : validationStatus === false ? 'text-red-600' : ''}
            />
          </div>
        </div>
      ) : (
        <p className="text-red-500">Invalid ticket data</p>
      )}
      <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
        Scan Another Ticket
      </Link>
    </div>
  );
}

function DataField({ label, value, className }) {
  return (
    <div>
      <p className="font-semibold text-gray-600">{label}</p>
      <p className={`text-black ${className}`}>{value}</p>
    </div>
  );
}

export default ValidationResult;