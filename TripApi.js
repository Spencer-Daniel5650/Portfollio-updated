const BASE_URL = 'http://localhost:3005/trips'; // Replace with your backend URL if deployed

export const fetchTrips = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createTrip = async (tripData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData),
  });
  return response.json();
};

export const updateTrip = async (id, tripData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData),
  });
  return response.json();
};

export const deleteTrip = async (id) => {
  await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
};
