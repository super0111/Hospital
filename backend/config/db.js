const mongoose = require('mongoose');



// const db = config.get('mongoURI');
const db = 'mongodb://localhost:27017/test';

// const username = "user";
// const password = "password123!@#";
// const cluster = "cluster0.anzwa";
// const dbname = "MyFirstDatabase";
// const db = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
