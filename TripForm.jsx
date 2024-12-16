import React, { useState, useEffect } from 'react';
import { createTrip, updateTrip } from './TripApi';

const TripForm = ({ currentTrip, onSave, onCancel }) => {
  const [tripData, setTripData] = useState({
    description: '',
    date: '',
    miles: 0,
    paymentAmount: 0,
  });

  useEffect(() => {
    if (currentTrip) setTripData(currentTrip);
  }, [currentTrip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentTrip) {
      await updateTrip(currentTrip._id, tripData);
    } else {
      await createTrip(tripData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={tripData.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={tripData.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Miles:
        <input
          type="number"
          name="miles"
          value={tripData.miles}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Payment Amount:
        <input
          type="number"
          name="paymentAmount"
          value={tripData.paymentAmount}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{currentTrip ? 'Update' : 'Create'}</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default TripForm;
