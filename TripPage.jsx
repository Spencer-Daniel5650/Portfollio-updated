import React, { useState } from 'react';
import TripTable from './TripTable';
import TripForm from './TripForm';

const TripPage = () => {
  const [currentTrip, setCurrentTrip] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (trip) => {
    setCurrentTrip(trip);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setCurrentTrip(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setCurrentTrip(null);
  };

  return (
    <div>
      <h1>Trips</h1>
      {showForm ? (
        <TripForm
          currentTrip={currentTrip}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <TripTable onEdit={handleEdit} />
      )}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add Trip</button>
      )}
    </div>
  );
};

export default TripPage;
