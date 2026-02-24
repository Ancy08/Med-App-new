import React, { useEffect, useState, useCallback } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const Patient = () => {

  const [medications, setMedications] = useState<any[]>([]);

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

  useEffect(() => {

    fetchMeds();

  }, [fetchMeds]); // ✅ important

  return (

    <div>

      <h2>Patient Medicines</h2>

      {medications.map((med) => (

        <div key={med._id}>

          {med.name}

        </div>

      ))}

    </div>

  );

};

export default Patient;