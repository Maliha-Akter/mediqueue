// src/app/login/page.jsx
import { Suspense } from 'react';
import LoginComponent from '@/components/LoginComponent'; 

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
}