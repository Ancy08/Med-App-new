import { useEffect, useState, useCallback } from "react";
import API_URL from "../config/api";

interface Medication {
  _id: string;
  patientName: string;
  medicineName: string;
  dosage: string;
  taken: boolean;
}

const Patient: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch medications from backend
  const fetchMeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/medicines`);
      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.substring(0, 200)}...`);
      const data: Medication[] = JSON.parse(text);
      setMedications(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeds();
  }, [fetchMeds]);

  // Mark a medicine as taken
  const markAsTaken = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/medicines/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taken: true }),
      });
      if (!res.ok) throw new Error("Failed to mark as taken");
      // Update local state immediately
      setMedications((prev) =>
        prev.map((med) => (med._id === id ? { ...med, taken: true } : med))
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-3">Patient Medicines</h2>

      {loading && <p>Loading medicines...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {medications.length === 0 && !loading && !error && <p>No medicines found.</p>}

      {medications.map((med) => (
        <div key={med._id} className="border p-3 mb-2 rounded flex justify-between items-center">
          <div>
            <h3 className="font-bold">{med.medicineName}</h3>
            <p>Patient: {med.patientName}</p>
            <p>Dosage: {med.dosage}</p>
            <p>Status: {med.taken ? "Taken ✅" : "Pending ❌"}</p>
          </div>
          {!med.taken && (
            <button
              onClick={() => markAsTaken(med._id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Mark as Taken
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Patient;