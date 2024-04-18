const express = require('express');
const session = require('express-session');
const redis = require('./config/redisConfig');
const RedisStore = require('connect-redis').default;
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const messageRoutes = require('./routes/messageRoutes');
const debatesRoutes = require('./routes/debatesRoutes');
const staticRoutes = require('./routes/staticRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const { isAuthenticated } = require('./utils/auth');
require('dotenv').config({ path: 'secure.env' });

const app = express();

app.use(session({
    store: new RedisStore({ client: redis }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: 'auto',  // secure cookies in production
        httpOnly: true,
        maxAge: 86400000  // 24 hours
    }
}));

app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// User routes
app.use('/users', userRoutes);
app.use('/api', sessionRoutes);
app.use('/rooms', isAuthenticated, roomRoutes);
app.use(messageRoutes);
app.use('/debates', isAuthenticated, debatesRoutes);
app.use(staticRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));