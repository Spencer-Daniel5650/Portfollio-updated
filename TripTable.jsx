import React, { useEffect, useState } from 'react';
import { fetchTrips, deleteTrip } from './TripApi';

const TripTable = ({ onEdit }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const loadTrips = async () => {
      const data = await fetchTrips();
      setTrips(data);
    };
    loadTrips();
  }, []);

  const handleDelete = async (id) => {
    await deleteTrip(id);
    setTrips(trips.filter((trip) => trip._id !== id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Miles</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trips.map((trip) => (
          <tr key={trip._id}>
            <td>{trip.description}</td>
            <td>{new Date(trip.date).toLocaleDateString()}</td>
            <td>{trip.miles}</td>
            <td>${trip.paymentAmount}</td>
            <td>
              <button onClick={() => onEdit(trip)}>Edit</button>
              <button onClick={() => handleDelete(trip._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TripTable;
