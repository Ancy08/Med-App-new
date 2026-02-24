import { useEffect, useState, useCallback } from "react";
import DatePicker from "react-date-picker";

interface Medication {
  _id: string;
  patientName: string;
  medicineName: string;
  dosage: string;
  taken: boolean;
  date: string;
}

function Caretaker() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [patientName, setPatientName] = useState("");
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Backend URL
  const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

  // ✅ FETCH MEDICINES (useCallback added)
  const fetchMeds = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/medicines`);

      if (!res.ok) {
        const text = await res.text();
        console.error("Server returned:", text);
        return;
      }

      const data = await res.json();
      setMedications(data);

    } catch (err) {
      console.error("Fetch error:", err);
    }
  }, [API_URL]);

  // ADD MEDICINE
  const addMedication = async () => {
    if (!patientName || !medicineName || !dosage || !selectedDate) {
      alert("Please fill all fields and select a date");
      return;
    }

    try {
      await fetch(`${API_URL}/api/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          patientName,
          medicineName,
          dosage,
          date: selectedDate,
        }),
      });

      setPatientName("");
      setMedicineName("");
      setDosage("");
      setSelectedDate(new Date());

      fetchMeds();

    } catch (err) {
      console.error(err);
    }
  };

  // TOGGLE TAKEN STATUS
  const toggleTaken = async (med: Medication) => {
    try {
      await fetch(`${API_URL}/api/medicines/${med._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          taken: !med.taken
        }),
      });

      fetchMeds();

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ useEffect dependency fixed
  useEffect(() => {
    fetchMeds();
  }, [fetchMeds]);

  // GROUP BY DATE
  const groupedMeds = medications.reduce((acc, med) => {
    const dateKey = new Date(med.date).toLocaleDateString();

    if (!acc[dateKey]) acc[dateKey] = [];

    acc[dateKey].push(med);

    return acc;
  }, {} as Record<string, Medication[]>);

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-5">
        Caretaker Dashboard
      </h1>

      {/* ADD MEDICINE */}
      <div className="flex mb-4 gap-2 flex-wrap">

        <input
          placeholder="Patient Name"
          value={patientName}
          onChange={(e)=>setPatientName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Medicine"
          value={medicineName}
          onChange={(e)=>setMedicineName(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          placeholder="Dosage"
          value={dosage}
          onChange={(e)=>setDosage(e.target.value)}
          className="border p-2 rounded"
        />

        <DatePicker
          value={selectedDate}
          onChange={(date)=>setSelectedDate(date as Date | null)}
          className="border p-2 rounded"
        />

        <button
          onClick={addMedication}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Medicine
        </button>

      </div>

      {/* DISPLAY MEDICINES */}

      {Object.entries(groupedMeds).map(([date, meds])=> (

        <div key={date} className="mb-6">

          <h2 className="font-bold text-xl mb-2">
            {date}
          </h2>

          {meds.map((med)=> (

            <div
              key={med._id}
              className="border p-4 mt-2 rounded flex justify-between items-center"
            >

              <div>

                <h3 className="font-bold">
                  {med.patientName}
                </h3>

                <p>{med.medicineName}</p>

                <p>
                  Dosage: {med.dosage}
                </p>

                <p>
                  Status:
                  {med.taken ? " Taken ✅" : " Pending ❌"}
                </p>

              </div>

              <button
                onClick={()=>toggleTaken(med)}
                className={`px-3 py-1 rounded ${
                  med.taken
                    ? "bg-yellow-500"
                    : "bg-blue-500 text-white"
                }`}
              >
                {med.taken ? "Undo" : "Mark Taken"}
              </button>

            </div>

          ))}

        </div>

      ))}

    </div>
  );
}

export default Caretaker;