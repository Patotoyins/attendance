// pages/api/students.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { student_id, full_name, year, tribu } = req.body;
    try {
      const result = await query(
        'INSERT INTO students (student_id, full_name, year, tribu) VALUES (?, ?, ?, ?)',
        [student_id, full_name, year, tribu]
      );
      res.status(200).json({ message: 'Student added successfully' });
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({ error: 'Failed to add student' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
