'use client';

import TestInterface from '@/components/TestInterface';
import { useTestSession } from '@/hooks/useTestSession';

export default function TestPage() {
  const { sessionId, loading, error } = useTestSession();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-lg font-semibold text-gray-700">Loading test...</p>
      </div>
    );
  }

  if (error || !sessionId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600 mb-2">Error loading test</p>
          <p className="text-gray-600">{error || 'Could not initialize session'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8" dir="rtl">
      <TestInterface sessionId={sessionId} />
    </div>
  );
}
