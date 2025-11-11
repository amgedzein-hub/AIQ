'use client';

import { useState, useEffect } from 'react';
import TestInterface from '@/components/TestInterface';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && !sessionId) {
      // Create a new test session
      const id = Math.random().toString(36).substring(7);
      setSessionId(id);
    }
  }, [user, sessionId]);

  if (loading || !sessionId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <TestInterface sessionId={sessionId} />
    </div>
  );
}
