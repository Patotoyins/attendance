// pages/assign-tribu.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // Import useRouter from Next.js

export default function AssignTribu() {
  const [studentId, setStudentId] = useState('');
  const [tribuId, setTribuId] = useState('');
  const [tribus, setTribus] = useState([]);
  const router = useRouter();  // Initialize the Next.js router

  // Fetch all tribus from the backend or static list
  useEffect(() => {
    // Static list of tribus (since they are predefined)
    setTribus([
      { id: 1, name: 'Mage' },
      { id: 2, name: 'Magic' },
      { id: 3, name: 'Support' },
      { id: 4, name: 'Fighter' },
      { id: 5, name: 'Assassin' },
      { id: 6, name: 'Marksman' },
      { id: 7, name: 'Tank' },
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/assign-tribu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: studentId, tribu_id: tribuId }),
    });

    if (res.ok) {
      alert('Tribu assigned successfully');
      router.push('/students');  // Navigate to the Students page after successful submission
    } else {
      alert('Failed to assign tribu');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Assign Tribu to Student</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-lg mx-auto">
        <div className="space-y-2">
          <label htmlFor="studentId" className="block text-gray-700 font-medium">
            Student ID
          </label>
          <input
            type="text"
            id="studentId"
            placeholder="Enter Student ID"
            className="border border-gray-300 rounded-lg p-3 w-full"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tribu" className="block text-gray-700 font-medium">
            Select Tribu
          </label>
          <select
            id="tribu"
            className="border border-gray-300 rounded-lg p-3 w-full"
            value={tribuId}
            onChange={(e) => setTribuId(e.target.value)}
            required
          >
            <option value="">Select a Tribu</option>
            {tribus.map((tribu) => (
              <option key={tribu.id} value={tribu.id}>
                {tribu.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full">
          Assign Tribu
        </button>
      </form>

      {/* Add navigation buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => router.push('/students')}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          View Students
        </button>
        <button
          onClick={() => router.push('/reports')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          View Reports
        </button>
      </div>
    </div>
  );
}
