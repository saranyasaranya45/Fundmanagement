const express = require('express');
const app = express();
const PORT = 4000;
const cors = require('cors');

// Sample database of donations
let donations = [];
app.use(express.json());
app.use(cors());

// Get all donations
app.get('/donations', (req, res) => {
  res.send(donations);
});

// Get a specific donation by ID
app.get('/donations/:id', (req, res) => {
  const donationId = req.params.id;
  const donation = donations.find(donation => donation.id === donationId);
  if (!donation) {
    return res.status(404).json({ message: 'Donation not found' });
  }
  res.json(donation);
});

// Record a new donation
app.post('/donations', (req, res) => {
  const { donorName, amount } = req.body;
  const newDonation = { id: Date.now().toString(), donorName, amount };
  donations.push(newDonation);
  res.status(201).json(newDonation);
});

// Update an existing donation
app.put('/donations/:id', (req, res) => {
  const donationId = req.params.id;
  const { donorName, amount } = req.body;
  const donationIndex = donations.findIndex(donation => donation.id === donationId);
  if (donationIndex === -1) {
    return res.status(404).json({ message: 'Donation not found' });
  }
  donations[donationIndex] = { id: donationId, donorName, amount };
  res.json(donations[donationIndex]);
});

// Delete an existing donation
app.delete('/donations/:id', (req, res) => {
  const donationId = req.params.id;
  donations = donations.filter(donation => donation.id !== donationId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
