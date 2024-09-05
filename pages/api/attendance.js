// pages/api/attendance.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { student_id } = req.body;

  if (req.method === 'POST') {
    try {
      const result = await query(
        `INSERT INTO attendance (student_id, check_in_time) VALUES (?, NOW()) 
        ON DUPLICATE KEY UPDATE check_out_time = NOW()`,
        [student_id]
      );
      res.status(200).json({ message: 'Attendance recorded' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to record attendance' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
