const express = require('express');
const cors = require('cors');
const app = express();
<<<<<<< Updated upstream
const port = 5000;

// Middleware to parse JSON bodies
=======
const sheets = require('./google-sheets'); // Import Google Sheets client
const port = 5000;

// Your Google Sheet ID and range
const SPREADSHEET_ID = 'your-spreadsheet-id-here';
const SHEET_NAME = 'Users'; // Name of your sheet tab

>>>>>>> Stashed changes
app.use(express.json());
app.use(cors()); // Enable CORS for React frontend

app.get('/hello', (req, res) => {
  res.send('Hello World!!');
<<<<<<< Updated upstream
})

app.post('/data', (req, res) => {
  console.log('Received data:', req.body);
  res.send(`Data received: ${req.body.data || 'No data provided'}`);
});

=======
});

app.post('/users', async (req, res) => {
  console.log("Request body:", req.body);
  const { nama, email } = req.body;

  try {
    // Append data to Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:B`, // Columns A and B
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[nama, email, new Date().toISOString()]] // Add timestamp
      }
    });

    res.status(201).json({ 
      message: "User added to Google Sheet", 
      updatedCells: response.data.updates.updatedCells 
    });
  } catch (error) {
    console.error("Google Sheets error:", error);
    res.status(500).json({ error: "Google Sheets error" });
  }
});

// New endpoint to get all users from Google Sheet
app.get('/users', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:C`, // Get all data from columns A, B, C
    });

    const rows = response.data.values;
    if (rows.length) {
      // Skip header row if exists
      const users = rows.slice(1).map((row, index) => ({
        id: index + 1,
        nama: row[0],
        email: row[1],
        createdAt: row[2]
      }));
      res.json(users);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

>>>>>>> Stashed changes
app.get('/about', (req, res) => {
  res.json({ message: "Ini endpoint About" });
});

app.listen(port, () => {
<<<<<<< Updated upstream
  console.log(`Server running on port ${port}`);
=======
  console.log(`Example App Listen to ${port}`);
>>>>>>> Stashed changes
});