import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

export default function GenerateQR({ student_id }) {
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    QRCode.toDataURL(student_id).then(setQrCode);
  }, [student_id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">QR Code for {student_id}</h1>
      <img src={qrCode} alt="QR Code" />
    </div>
  );
}
