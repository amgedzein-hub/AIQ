'use client';

import { useEffect, useState } from 'react';
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12 px-4" dir="rtl">
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                {/* Header Section */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">نتائج اختبار الذكاء</h1>
                    <div className="relative inline-block group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative glass-card px-12 py-8 rounded-3xl border-white/50">
                            <span className="block text-sm font-medium text-slate-500 mb-2 uppercase tracking-wider">درجة الذكاء الكلية</span>
                            <span className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                                {Math.round(results.totalScore)}
                            </span>
                        </div>
                    </div>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed glass p-6 rounded-2xl">
                        {results.interpretation}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Domain Analysis */}
                    <div className="glass-card p-8 rounded-3xl animate-fade-in-up delay-100">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl">📊</span>
                            <h3 className="text-xl font-bold text-slate-900">تحليل القدرات</h3>
                        </div>
                        <div className="space-y-6">
                            {Object.entries(results.domains).map(([domain, data], index) => (
                                <div key={domain} className="group">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium text-slate-700">{domain}</span>
                                        <span className="font-bold text-primary-600">{Math.round(data.score)}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2.5 rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                                            style={{
                                                width: `${Math.min(100, (data.score / 160) * 100)}%`,
                                                animationDelay: `${index * 100}ms`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Peer Comparison */}
                    <div className="glass-card p-8 rounded-3xl animate-fade-in-up delay-200">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl">👥</span>
                            <h3 className="text-xl font-bold text-slate-900">مقارنة بالأقران</h3>
                        </div>
                        <div className="flex flex-col items-center justify-center h-64 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl" />
                            <div className="text-center relative z-10">
                                <span className="block text-6xl font-bold text-primary-600 mb-2 animate-float">
                                    {results.percentile}%
                                </span>
                                <span className="text-lg text-slate-600 font-medium">أعلى من أقرانك</span>
                                <p className="text-sm text-slate-400 mt-4 max-w-xs mx-auto">
                                    هذه النتيجة تعني أن أداءك أفضل من {results.percentile}% من الأشخاص في نفس فئتك العمرية.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-8 animate-fade-in-up delay-300">
                    <a
                        href="/"
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-slate-900 rounded-2xl hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                    >
                        <span className="relative z-10">العودة للصفحة الرئيسية 🏠</span>
                        <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </a>
                </div>
            </div>
        </div>
    );
}
