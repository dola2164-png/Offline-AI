import React, { useState } from 'react';

export default function TruckOwner() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    setIsSubmitted(true);
  };

  return (
    <main style={{ padding: '100px 5%', minHeight: '70vh', textAlign: 'center' }}>
      <p className="sl">Transport Partner Portal</p>
      <h2 className="st">Drive with <span>Offline AI</span></h2>
      <p className="ss" style={{ margin: '0 auto 2rem' }}>
        Get direct booking requests via SMS. No smartphone needed to accept rides and transport crops for farmers in your area.
      </p>

      {/* 1. Default State: Show Register Button */}
      {!showForm && !isSubmitted && (
        <button className="bp" onClick={() => setShowForm(true)}>Register your Truck</button>
      )}

      {/* 2. Form State: Show Inputs */}
      {showForm && !isSubmitted && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
          <input type="text" placeholder="Truck Model" required />
          <input type="number" placeholder="City PIN" required />
          <input type="text" placeholder="Owner Name" required />
          <input type="number" placeholder="Phone Number" required />
          <input type="email" placeholder="Gmail Address" required />
          <input type="number" placeholder="Mileage KMPL (Optional)" />
          <button type="submit" className="bp" style={{ marginTop: '10px' }}>Submit</button>
        </form>
      )}

      {/* 3. Success State: Show Thank You Message */}
      {isSubmitted && (
        <div style={{ padding: '20px', border: '1px solid green', borderRadius: '5px', maxWidth: '400px', margin: '0 auto' }}>
          <h3 style={{ color: 'green', margin: '0 0 10px 0' }}>Thank you for registering!</h3>
          <p style={{ margin: 0 }}>If anyone wants to book truck, we will ask you by message what you would charge.</p>
        </div>
      )}
    </main>
  );
}
