import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Fund.css';

export default function FundraisingManagement() {
  const [donations, setDonations] = useState([]);
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState(0);
  const [editingDonationId, setEditingDonationId] = useState(null);
  const [editingDonation, setEditingDonation] = useState({});

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/donations');
      setDonations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDonation = async () => {
    try {
      await axios.post('http://127.0.0.1:4000/donations', { donorName, amount });
      fetchDonations();
      setDonorName('');
      setAmount(0);
      alert('Donation recorded successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to record donation');
    }
  };

  const handleDeleteDonation = async (donationId) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/donations/${donationId}`);
      fetchDonations();
      alert('Donation deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete donation');
    }
  };

  const handleEditDonation = (donationId) => {
    const donationToEdit = donations.find(donation => donation.id === donationId);
    setEditingDonationId(donationId);
    setEditingDonation(donationToEdit);
  };

  const handleUpdateDonation = async () => {
    try {
      await axios.put(`http://127.0.0.1:4000/donations/${editingDonation.id}`, editingDonation);
      fetchDonations();
      setEditingDonationId(null);
      setEditingDonation({});
      alert('Donation updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update donation');
    }
  };

  return (
    <div className="container text-center">
      <center><h3>Fundraising Management System</h3></center>
      <form>
        <div className="mb-3">
          <label className="form-label">Donor Name</label><br />
          <input type="text" value={donorName} onChange={(e) => setDonorName(e.target.value)} /><br />
        </div>
        <div className="mb-3">
          <label className="form-label">Donation Amount</label><br />
          <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} /><br />
          {editingDonationId === null ? (
            <button variant="primary" onClick={handleDonation}>Record Donation</button>
          ) : (
            <button variant="primary" onClick={handleUpdateDonation}>Update Donation</button>
          )}
        </div>
      </form>
      <div className="results">
        {donations.map((donation, index) => (
          <div className="row" key={index}>
            <div className="res">
              <h2>Name:</h2><span>{editingDonationId === donation.id ? <input value={editingDonation.donorName} onChange={(e) => setEditingDonation({ ...editingDonation, donorName: e.target.value })} /> : donation.donorName}</span>
              <h2>Amount:</h2><span> ${editingDonationId === donation.id ? <input value={editingDonation.amount} onChange={(e) => setEditingDonation({ ...editingDonation, amount: parseFloat(e.target.value) })} /> : donation.amount}</span><br></br>
              {editingDonationId === donation.id ? (
                <>
                  <button onClick={handleUpdateDonation}>Save</button>
                  <button onClick={() => setEditingDonationId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditDonation(donation.id)}>Edit</button>
                  <button onClick={() => handleDeleteDonation(donation.id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
