const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const phonebookRoutes = require('./routes/phonebookRoutes');
const errorHandler = require('./middleware/errorHandler');

// const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = "mongodb+srv://srft12345678:srft12345678@traversymedia.rxkgp.mongodb.net/phoneBookDB?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(express.json());
app.use(morgan('dev'));
// Enable CORS
app.use(cors());

// Routes
app.use('/api/phonebook', phonebookRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
