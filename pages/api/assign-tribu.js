// pages/api/assign-tribu.js
import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { student_id, tribu_id } = req.body;

  if (req.method === 'POST') {
    try {
      const result = await query(
        `UPDATE students SET tribu_id = ? WHERE student_id = ?`,
        [tribu_id, student_id]
      );
      res.status(200).json({ message: 'Tribu assigned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to assign tribu' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
