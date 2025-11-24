'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';

interface DomainResult {
    score: number;
    percentile: number;
}

interface ResultsData {
    sessionId: string;
    totalScore: number;
    percentile: number;
    domains: Record<string, DomainResult>;
    interpretation: string;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default function ResultsView({ sessionId }: { sessionId: string }) {
    const t = useTranslations();
    const [results, setResults] = useState<ResultsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`${API_URL}/results/${sessionId}`);
                setResults(response.data);
            } catch (err) {
                setError('Failed to load results');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [sessionId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !results) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center text-red-600">
                    <h2 className="text-2xl font-bold mb-2">Error</h2>
                    <p>{error || 'Could not find results'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8" dir="rtl">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">نتائج اختبار الذكاء</h1>
                <div className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl shadow-lg">
                    <span className="block text-sm opacity-90 mb-1">درجة الذكاء الكلية</span>
                    <span className="text-5xl font-bold">{Math.round(results.totalScore)}</span>
                </div>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    {results.interpretation}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">تحليل القدرات</h3>
                    <div className="space-y-4">
                        {Object.entries(results.domains).map(([domain, data]) => (
                            <div key={domain}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-gray-700">{domain}</span>
                                    <span className="text-gray-600">{Math.round(data.score)}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-indigo-600 h-2.5 rounded-full"
                                        style={{ width: `${Math.min(100, (data.score / 160) * 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">مقارنة بالأقران</h3>
                    <div className="flex items-center justify-center h-48">
                        <div className="text-center">
                            <span className="block text-4xl font-bold text-indigo-600 mb-2">
                                {results.percentile}%
                            </span>
                            <span className="text-gray-600">أعلى من أقرانك</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center pt-8">
                <a
                    href="/"
                    className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
                >
                    العودة للصفحة الرئيسية
                </a>
            </div>
        </div>
    );
}
