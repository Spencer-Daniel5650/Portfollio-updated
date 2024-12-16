import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import 'dotenv/config';
import 'dotenv/config';
console.log('MongoDB URI:', process.env.MONGODB_CONNECT_STRING);


console.log('ENV Variables:', process.env);

console.log('MongoDB URI:', process.env.MONGODB_CONNECT_STRING); // Debug log

mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connection to the Trips database collection was successful.'))
    .catch(error => console.error('Connection to the Trips database collection failed due to:', error));

// Schema for trips
const tripSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    miles: { type: Number, required: true, min: 0 },
    paymentAmount: { type: Number, required: true, min: 0 },
    description: { type: String, default: '' } // Optional field for additional details
});

// Model for trips collection
const Trip = mongoose.model('Trip', tripSchema);

// CREATE a new trip
const createTrip = async (date, miles, paymentAmount, description) => {
    const trip = new Trip({ date, miles, paymentAmount, description });
    return trip.save();
};

// RETRIEVE all trips
const retrieveTrips = async () => {
    return Trip.find();
};

// RETRIEVE a trip by ID
const retrieveTripByID = async (_id) => {
    return Trip.findById(_id);
};

// UPDATE a trip
const updateTrip = async (_id, date, miles, paymentAmount, description) => {
    return Trip.findByIdAndUpdate(
        _id,
        { date, miles, paymentAmount, description },
        { new: true, runValidators: true }
    );
};

// DELETE a trip by ID
const deleteTripById = async (_id) => {
    const result = await Trip.deleteOne({ _id });
    return result.deletedCount;
};

export { createTrip, retrieveTrips, retrieveTripByID, updateTrip, deleteTripById };
