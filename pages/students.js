// pages/students.js
import { useState } from 'react';

export default function Students() {
  const [formData, setFormData] = useState({
    student_id: '',
    name: '',
    contact_info: '',
    year_level: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Student added successfully');
    } else {
      alert('Failed to add student');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Student ID"
          className="border p-2 w-full"
          value={formData.student_id}
          onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Contact Info"
          className="border p-2 w-full"
          value={formData.contact_info}
          onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
        />
        <select
          className="border p-2 w-full"
          value={formData.year_level}
          onChange={(e) => setFormData({ ...formData, year_level: e.target.value })}
        >
          <option value={1}>Year 1</option>
          <option value={2}>Year 2</option>
          <option value={3}>Year 3</option>
          <option value={4}>Year 4</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Student</button>
      </form>
    </div>
  );
}
