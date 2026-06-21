// src/app/login/page.jsx
import { Suspense } from 'react';
import SignUpComponent from '@/components/SignUpComponent';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpComponent />
    </Suspense>
  );
}