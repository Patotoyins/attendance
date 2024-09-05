import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(WrappedComponent, allowedRoles) {
  return function AuthWrapper(props) {
    const router = useRouter();

    useEffect(() => {
      const storedStudentData = localStorage.getItem('studentData');
      if (!storedStudentData) {
        router.push('/login');
        return;
      }

      const userData = JSON.parse(storedStudentData);
      if (!allowedRoles.includes(userData.role)) {
        router.push('/login'); // Redirect to login if not allowed
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
