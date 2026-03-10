import { useState, useEffect, useCallback } from "react";
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

  // Form state for adding new medication
  const [patientName, setPatientName] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");

  // Fetch medications
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

  // Add new medication
  const addMedication = async () => {
    if (!patientName || !medicineName || !dosage) return alert("All fields are required!");
    try {
      const res = await fetch(`${API_URL}/medicines`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientName, medicineName, dosage, taken: false }),
      });
      if (!res.ok) throw new Error("Failed to add medication");
      fetchMeds(); // Refresh list
      setPatientName("");
      setMedicineName("");
      setDosage("");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-3">Caretaker Panel</h2>

      {/* Add medication form */}
      <div className="mb-5 border p-3 rounded">
        <h3 className="font-semibold mb-2">Add Medication</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border p-1 rounded"
          />
          <input
            type="text"
            placeholder="Medicine Name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            className="border p-1 rounded"
          />
          <input
            type="text"
            placeholder="Dosage"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="border p-1 rounded"
          />
        </div>
        <button
          onClick={addMedication}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add Medication
        </button>
      </div>

      {/* Medication list */}
      {loading && <p>Loading medicines...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {medications.length === 0 && !loading && <p>No medicines found.</p>}

      {medications.map((med) => (
        <div
          key={med._id}
          className={`border p-3 mb-2 rounded flex justify-between items-center ${
            med.taken ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div>
            <h3 className="font-bold">{med.medicineName}</h3>
            <p>Patient: {med.patientName}</p>
            <p>Dosage: {med.dosage}</p>
            <p>Status: {med.taken ? "Taken ✅" : "Pending ❌"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Caretaker;