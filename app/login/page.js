'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';  // Adjust path if necessary
import { Input } from '../../components/ui/input';    // Adjust path if necessary
import { toast } from 'sonner';

export default function LoginForm() {
  const router = useRouter();
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost/attendance-api/login.php', {
        student_id: studentID,
        password: password,
      });

      if (response.data.success) {
        // Login successful
        router.push('/dashboard');
      } else {
        toast.error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
        placeholder="Student ID"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
