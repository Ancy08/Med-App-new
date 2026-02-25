import React, { useEffect, useState, useCallback } from "react";

// API_URL from environment variables
const API_URL = process.env.REACT_APP_API_URL;

interface Medication {
  _id: string;
  name: string;
}

const Patient: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);

  // Fetch medications from backend
  const fetchMeds = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/medicines`);

      if (!res.ok) {
        const text = await res.text();
        console.error("Server returned:", text);
        return;
      }

      const data: Medication[] = await res.json();
      setMedications(data);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, []); // ✅ No API_URL dependency here

  // Call fetch on mount
  useEffect(() => {
    fetchMeds();
  }, [fetchMeds]); // Important to keep fetchMeds in dependencies

  return (
    <div>
      <h2>Patient Medicines</h2>
      {medications.length === 0 ? (
        <p>No medicines found.</p>
      ) : (
        medications.map((med) => (
          <div key={med._id}>{med.name}</div>
        ))
      )}
    </div>
  );
};

export default Patient;