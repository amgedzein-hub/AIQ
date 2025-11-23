'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
                    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ غير متوقع</h2>
                        <p className="text-gray-600 mb-6">
                            نعتذر عن هذا الخطأ. يرجى تحديث الصفحة أو المحاولة مرة أخرى لاحقاً.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                        >
                            تحديث الصفحة
                        </button>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="mt-8 text-left text-xs text-red-500 bg-red-50 p-4 rounded overflow-auto max-h-48">
                                <pre>{this.state.error.toString()}</pre>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
