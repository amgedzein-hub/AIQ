'use client';

import { useState, useEffect } from 'react';
import TestInterface from '@/components/TestInterface';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Create a new test session (no authentication required)
    const id = Math.random().toString(36).substring(7);
    setSessionId(id);
  }, []);

  if (!sessionId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-lg font-semibold text-gray-700">Loading test...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8" dir="rtl">
      <TestInterface sessionId={sessionId} />
    </div>
  );
}
