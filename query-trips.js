import mongoose from "mongoose";

const uri = "mongodb+srv://dspence3:Password12345@uber-trips.wsz8r.mongodb.net/uber-trips";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        const Trip = mongoose.model("Trip", new mongoose.Schema({}, { strict: false, collection: "trips" }));
        return Trip.find({});
    })
    .then(trips => {
        console.log("Trips:", trips);
        mongoose.connection.close();
    })
    .catch(err => {
        console.error("Error:", err);
    });
