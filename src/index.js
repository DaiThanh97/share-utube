const app = require('./app');
const mongoose = require('mongoose');

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected to DB");
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server listening on port 5000");
        });
    } catch (err) {
        throw new Error(err);
    }
};

start();
