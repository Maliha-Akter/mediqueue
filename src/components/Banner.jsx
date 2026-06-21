// src/app/login/page.jsx
import { Suspense } from 'react';
import BannerComponent from './BannerComponent';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BannerComponent />
    </Suspense>
  );
}