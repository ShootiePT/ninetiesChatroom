const express = require('express');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const messageRoutes = require('./routes/messageRoutes');
const debatesRoutes = require('./routes/debatesRoutes');

const app = express();
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// User routes
app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.use(messageRoutes);
app.use('/debates', debatesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));