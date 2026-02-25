import { useEffect, useState, useCallback } from "react";
import API_URL from "../config/api";
interface Medication {
  _id: string;
  patientName: string;
  medicineName: string;
  dosage: string;
  taken: boolean;
}

const Caretaker: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  const fetchMeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/medicines`);
      const text = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.substring(0, 200)}...`);
      const data: Medication[] = JSON.parse(text);
      setMedications(data);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const markTaken = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/medicines/${id}`, { method: "PUT" });
      if (!res.ok) throw new Error(`Failed to mark tablet: ${res.status}`);
      fetchMeds();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => { fetchMeds(); }, [fetchMeds]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Patient Dashboard</h1>
      {loading && <p>Loading medicines...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {medications.map((med) => (
        <div key={med._id} className="border p-4 mt-4 flex justify-between rounded">
          <div>
            <h2 className="font-bold">{med.medicineName}</h2>
            <p>Patient: {med.patientName}</p>
            <p>Dosage: {med.dosage}</p>
            <p>Status: {med.taken ? "Taken ✅" : "Pending ❌"}</p>
          </div>
          <button
            onClick={() => markTaken(med._id)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Tablet Taken
          </button>
        </div>
      ))}
    </div>
  );
};

export default Caretaker;