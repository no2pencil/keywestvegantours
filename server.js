const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));

const PORT = 3000;

// --------------------
// Home Page
// --------------------
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --------------------------------------
// Map Folder as Static Content
// --------------------------------------
app.use('/map', express.static(path.join(__dirname, 'map')));

// --------------------------------------
// Restaurants JSON
// --------------------------------------
app.get('/map/restaurants', (req, res) => {
    fs.readFile(path.join(__dirname, 'map/restaurants.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Cannot read restaurant data' });
        }

        let restaurants = [];
        try {
            restaurants = JSON.parse(data || '[]');
        } catch (e) {
            return res.status(500).json({ error: 'Invalid JSON format' });
        }

        // Optional: filter by type
        if (req.query.type) {
            const type = req.query.type.toLowerCase();
            restaurants = restaurants.filter(r => r.type.toLowerCase() === type);
        }

        res.json(restaurants);
    });
});

// --------------------
// Start Server
// --------------------
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
