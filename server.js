const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.static('public'));
app.use(express.json()); // To parse JSON bodies

// Open the database
const db = new sqlite3.Database('./adab.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error opening database", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

// API endpoint to get the first book category
app.get('/data', (req, res) => {
    const sql = `SELECT "Line" FROM my_table_name LIMIT 1 OFFSET 0`;

    db.get(sql, (err, row) => {
        if (err) {
            console.error("Error executing SQL query", err.message);
            res.status(400).json({ error: err.message });
            return;
        }
        console.log("SQL Query Result:", row);  // Log the SQL query result
        res.json({ bookCategory: row ? row["Line"] : "No category found" });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
