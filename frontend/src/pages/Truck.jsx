import React, { useState } from 'react';
import { API_URL } from '../config';

export default function TruckOwner() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    truckModel: '',
    cityPin: '',
    ownerName: '',
    phoneNumber: '',
    email: '',
    mileageKmpl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        truckModel: formData.truckModel,
        cityPin: formData.cityPin,
        ownerName: formData.ownerName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        mileageKmpl: formData.mileageKmpl ? parseFloat(formData.mileageKmpl) : null
      };

      const response = await fetch(`${API_URL}/api/trucks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed with status ${response.status}`);
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ padding: '100px 5%', minHeight: '70vh', textAlign: 'center' }}>
      <p className="sl">Transport Partner Portal</p>
      <h2 className="st">Drive with <span>Offline AI</span></h2>
      <p className="ss" style={{ margin: '0 auto 2rem' }}>
        Get direct booking requests via SMS. No smartphone needed to accept rides and transport crops for farmers in your area.
      </p>

      {!showForm && !isSubmitted && (
        <button className="bp" onClick={() => setShowForm(true)}>Register your Truck</button>
      )}

      {showForm && !isSubmitted && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
          <input
            type="text"
            name="truckModel"
            placeholder="Truck Model"
            value={formData.truckModel}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="cityPin"
            placeholder="City PIN"
            value={formData.cityPin}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Gmail Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="mileageKmpl"
            placeholder="Mileage KMPL (Optional)"
            value={formData.mileageKmpl}
            onChange={handleChange}
          />

          {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}

          <button type="submit" className="bp" style={{ marginTop: '10px' }} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}

      {isSubmitted && (
        <div style={{ padding: '20px', border: '1px solid green', borderRadius: '5px', maxWidth: '400px', margin: '0 auto' }}>
          <h3 style={{ color: 'green', margin: '0 0 10px 0' }}>Thank you for registering!</h3>
          <p style={{ margin: 0 }}>If anyone wants to book truck, we will ask you by message what you would charge.</p>
        </div>
      )}
    </main>
  );
}
