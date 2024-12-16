import express from 'express';
import {
  createTrip,
  retrieveTrips,
  retrieveTripByID,
  updateTrip,
  deleteTripById
} from './trips-model.mjs';

// Initialize Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Uber Trips API!');
});

// CREATE a new trip
app.post('/trips', async (req, res) => {
  try {
    const { date, miles, paymentAmount, description } = req.body;

    if (!date || !miles || !paymentAmount) {
      return res.status(400).json({ error: 'Missing required fields: date, miles, or paymentAmount' });
    }

    const trip = await createTrip(new Date(date), miles, paymentAmount, description || '');
    res.status(201).json(trip);
  } catch (error) {
    console.error('Error creating trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// RETRIEVE all trips
app.get('/trips', async (req, res) => {
  try {
    const trips = await retrieveTrips();
    res.status(200).json(trips);
  } catch (error) {
    console.error('Error retrieving trips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// RETRIEVE a specific trip by ID
app.get('/trips/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await retrieveTripByID(id);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error('Error retrieving trip by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE a trip by ID
app.put('/trips/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { date, miles, paymentAmount, description } = req.body;

    const updatedTrip = await updateTrip(id, new Date(date), miles, paymentAmount, description || '');

    if (!updatedTrip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a trip by ID
app.delete('/trips/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await deleteTripById(id);

    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting trip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
