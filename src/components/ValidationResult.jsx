import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

function ValidationResult() {
  const location = useLocation();
  const ticketData = location.state?.ticketData;
  const [validationStatus, setValidationStatus] = useState(null);
  const [eta, setEta] = useState(null);

  const stations = ['Margao', 'Vasco da Gama', 'Ponda', 'Mapusa'];

  let parsedData;
  try {
    parsedData = JSON.parse(ticketData);
  } catch (error) {
    console.error('Error parsing ticket data:', error);
  }

  useEffect(() => {
    const validateTicket = async () => {
      try {
        const response = await fetch('https://637b-103-216-234-205.ngrok-free.app/validate_otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            party_ids_to_store_ids: parsedData.storeId,
            program_id: parsedData.computeId,
            seed: parsedData.username,
            otp: parsedData.otp,
          }),
        });

        const { data } = await response.json();
        if (data.isvalid === 1) {
          // Update the ticket validation status on the server
          await fetch(`https://ticket-backend-j37d.onrender.com/ticket/${parsedData.ticketId}/validate`, {
            method: 'POST',
          });
          setValidationStatus(true);
        } else {
          setValidationStatus(false);
        }
      } catch (error) {
        console.error('Error validating ticket:', error);
        setValidationStatus(false);
      }
    };

    const predictEta = async () => {
      try {
        const fromIndex = stations.indexOf(parsedData.start) + 1;
        const toIndex = stations.indexOf(parsedData.end) + 1;

        const response = await fetch('https://637b-103-216-234-205.ngrok-free.app/predict_eta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: fromIndex,
            to: toIndex,
            day_of_the_week: 1
          }),
        });

        const data = await response.json();
        setEta(data.eta);
      } catch (error) {
        console.error('Error predicting ETA:', error);
      }
    };

    validateTicket();
    predictEta();
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
            <DataField
              label="Estimated Travel Time"
              value={eta ? `${eta} minutes` : 'Calculating...'}
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