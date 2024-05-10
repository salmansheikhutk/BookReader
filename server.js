const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));

// Open the database
const db = new sqlite3.Database('./adab.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Error opening database", err.message);
    }
});

// API endpoint to get the first book category
app.get('/data', (req, res) => {
    const sql = `SELECT "Book Category" FROM my_table_name LIMIT 1`;

    db.get(sql, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
        } else if (row) {
            res.json({ bookCategory: row["Book Category"] });
        } else {
            res.json({ error: "No data found or column is missing" });
        }
    });
});




app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
