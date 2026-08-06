"use client";

import { useState } from "react";

export default function LandSubmissionForm({ onClose }: { onClose?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    county: "",
    acres: "",
    description: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to your lead capture (webhook, form backend, etc.)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="land-form-success">
        <div className="land-form-check" aria-hidden="true">
          ✓
        </div>
        <h3>Submission received</h3>
        <p>
          Your parcel goes into LandLens for scoring tonight. We buy across
          Georgia with a focus on secondary and smaller markets, and a human
          will come back to you within 24 hours either way.
        </p>
        {onClose && (
          <button type="button" onClick={onClose} className="btn-secondary">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form className="land-form" onSubmit={handleSubmit}>
      <div className="land-form-header">
        <h3>Sell Your Land in Georgia</h3>
        <p>
          Tell us what you have. LandLens scores it against zoning, access, and
          utility layers, and a person reviews the result before anyone contacts
          you.
        </p>
      </div>

      <div className="form-row">
        <input
          name="name"
          placeholder="Full name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <input
          name="phone"
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
        />
        <select name="county" required value={form.county} onChange={handleChange}>
          <option value="">Select county</option>
          <option>Baldwin</option>
          <option>Barrow</option>
          <option>Bibb</option>
          <option>Bulloch</option>
          <option>Burke</option>
          <option>Camden</option>
          <option>Carroll</option>
          <option>Chatham</option>
          <option>Clarke</option>
          <option>Columbia</option>
          <option>Coweta</option>
          <option>Crawford</option>
          <option>Dougherty</option>
          <option>Elbert</option>
          <option>Franklin</option>
          <option>Fulton</option>
          <option>Glynn</option>
          <option>Greene</option>
          <option>Habersham</option>
          <option>Hall</option>
          <option>Hancock</option>
          <option>Harris</option>
          <option>Hart</option>
          <option>Henry</option>
          <option>Houston</option>
          <option>Jackson</option>
          <option>Jefferson</option>
          <option>Jenkins</option>
          <option>Laurens</option>
          <option>Liberty</option>
          <option>Lincoln</option>
          <option>Macon</option>
          <option>Madison</option>
          <option>Marion</option>
          <option>McDuffie</option>
          <option>Mitchell</option>
          <option>Monroe</option>
          <option>Montgomery</option>
          <option>Morgan</option>
          <option>Newton</option>
          <option>Oconee</option>
          <option>Oglethorpe</option>
          <option>Paulding</option>
          <option>Peach</option>
          <option>Pickens</option>
          <option>Pike</option>
          <option>Polk</option>
          <option>Pulaski</option>
          <option>Putnam</option>
          <option>Richmond</option>
          <option>Rockdale</option>
          <option>Screven</option>
          <option>Spalding</option>
          <option>Sumter</option>
          <option>Talbot</option>
          <option>Taliaferro</option>
          <option>Tattnall</option>
          <option>Taylor</option>
          <option>Terrell</option>
          <option>Thomas</option>
          <option>Tift</option>
          <option>Toombs</option>
          <option>Treutlen</option>
          <option>Twiggs</option>
          <option>Upson</option>
          <option>Walker</option>
          <option>Walton</option>
          <option>Ware</option>
          <option>Washington</option>
          <option>Wayne</option>
          <option>Wilcox</option>
          <option>Wilkes</option>
          <option>Wilkinson</option>
          <option>Other / Not Listed</option>
        </select>
      </div>

      <div className="form-row">
        <input
          name="acres"
          type="number"
          placeholder="Approx. acres"
          required
          value={form.acres}
          onChange={handleChange}
        />
        <input
          name="price"
          type="text"
          placeholder="Asking price (optional)"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <textarea
        name="description"
        placeholder="Anything else we should know? Road access, water, timber, restrictions, etc."
        rows={3}
        value={form.description}
        onChange={handleChange}
      />

      <button type="submit" className="btn-primary btn-lg btn-block land-form-submit">
        Submit My Property →
      </button>

      {onClose && (
        <button type="button" onClick={onClose} className="btn-text land-form-cancel">
          Cancel
        </button>
      )}
    </form>
  );
}
