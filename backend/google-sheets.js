const { google } = require('googleapis');

// Configure authentication (choose one method below)

// Method 1: Service Account (recommended for production)
const auth = new google.auth.GoogleAuth({
  keyFile: 'path-to-your-service-account-key.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Method 2: API Key (simpler, but less secure)
// const auth = new google.auth.GoogleAuth({
//   key: 'YOUR_API_KEY',
//   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// });

const sheets = google.sheets({ version: 'v4', auth });

module.exports = sheets;