import React, { useEffect, useState, useCallback } from "react";

interface Medication {
  _id: string;
  name: string;
  dosage?: string;
  taken?: boolean;
}

const Patient: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Backend URL (remove trailing slash)
  const API_BASE =
    (process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : process.env.REACT_APP_API_URL?.replace(/\/$/, "")) || "";

  const fetchMeds = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/medicines`);
      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.substring(0,200)}...`);

      const data: Medication[] = JSON.parse(text);
      setMedications(data);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchMeds();
  }, [fetchMeds]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-3">Patient Medicines</h2>

      {loading && <p>Loading medicines...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {medications.length === 0 && !loading && !error && <p>No medicines found.</p>}

      {medications.map((med) => (
        <div key={med._id} className="border p-3 mb-2 rounded">
          <h3 className="font-bold">{med.name}</h3>
          {med.dosage && <p>Dosage: {med.dosage}</p>}
          {med.taken !== undefined && <p>Status: {med.taken ? "Taken ✅" : "Pending ❌"}</p>}
        </div>
      ))}
    </div>
  );
};

export default Patient;