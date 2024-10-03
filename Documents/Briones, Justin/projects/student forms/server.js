const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const newStudent = req.body;

    fs.readFile('form.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read file' });
        }

        const jsonData = JSON.parse(data || '[]');
        jsonData.push(newStudent);

        fs.writeFile('form.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write file' });
            }
            res.status(200).json({ message: 'Data saved successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});