const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Open the database
const db = new sqlite3.Database('./adab.db', sqlite3.OPEN_READWRITE);

// API endpoint to get all lines on page 13 for the specified book title
app.get('/data', (req, res) => {
    const sql = `SELECT "Line" FROM my_table_name WHERE "Page Number" = 13 and "Book Name" = 'آداب الفتوى والمفتي والمستفتي'`;

    db.all(sql, (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        const lines = rows.map(row => row["Line"]);
        res.json({ lines });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

