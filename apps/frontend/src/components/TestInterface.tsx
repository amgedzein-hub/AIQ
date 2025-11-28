'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import HomeButton from './HomeButton';

interface Question {
  id: string;
  domain: string;
  text_ar: string;
  options: string[];
  difficulty: number;
}

interface TestState {
  currentQuestion: Question | null;
  questionNumber: number;
  totalQuestions: number;
  responses: Record<string, string>;
  isLoading: boolean;
  error: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default function TestInterface({
  sessionId,
}: {
  sessionId: string;
}) {
  const t = useTranslations();
  const [state, setState] = useState<TestState>({
    currentQuestion: null,
    questionNumber: 1,
    totalQuestions: 20,
    responses: {},
    isLoading: true,
    error: null,
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const fetchNextQuestion = useCallback(async (currentResponses: Record<string, string>) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await axios.post(`${API_URL}/questions/next`, {
        sessionId,
        currentResponses,
      });
      setState((prev) => ({
        ...prev,
        currentQuestion: response.data.question,
        isLoading: false,
      }));
      setSelectedAnswer(null);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to load question',
        isLoading: false,
      }));
    }
  }, [sessionId]);

  useEffect(() => {
    fetchNextQuestion({});
  }, [fetchNextQuestion]);

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !state.currentQuestion) return;

    try {
      const newResponses = {
        ...state.responses,
        [state.currentQuestion!.id]: selectedAnswer,
      };

      // Submit answer to backend for tracking
      await axios.post(`${API_URL}/answers/submit`, {
        sessionId,
        questionId: state.currentQuestion.id,
        answer: selectedAnswer,
        currentTheta: 0, // Will be updated by backend
      });

      setState((prev) => ({
        ...prev,
        responses: newResponses,
      }));

      if (state.questionNumber >= state.totalQuestions) {
        // Test completed, redirect to results
        window.location.href = `/results/${sessionId}`;
      } else {
        setState((prev) => ({
          ...prev,
          questionNumber: prev.questionNumber + 1,
        }));
        await fetchNextQuestion(newResponses);
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to submit answer',
      }));
    }
  };

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-700">{state.error}</p>
      </div>
    );
  }

  if (!state.currentQuestion) {
    return (
      <div className="text-center">
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <>
      <HomeButton
        showConfirmation={true}
        confirmationMessage="هل أنت متأكد أنك تريد مغادرة الاختبار؟ سيتم فقدان تقدمك الحالي."
      />
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8 px-4" dir="rtl">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">
                {t('test.question')} {state.questionNumber} {t('test.of')} {state.totalQuestions}
              </span>
              <span className="text-sm font-bold text-primary-600">
                {Math.round((state.questionNumber / state.totalQuestions) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-3 backdrop-blur-sm border border-white/20">
              <div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(99,102,241,0.3)]"
                style={{
                  width: `${(state.questionNumber / state.totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-card rounded-3xl p-8 mb-8 animate-fade-in-up delay-100">
            <div className="mb-6 flex items-center justify-between">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100">
                {state.currentQuestion.domain}
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 leading-relaxed">
              {state.currentQuestion.text_ar}
            </h2>

            {/* Options */}
            <div className="space-y-4">
              {state.currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`group flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${selectedAnswer === option
                    ? 'border-primary-500 bg-primary-50/50 shadow-md transform scale-[1.02]'
                    : 'border-transparent bg-white/50 hover:bg-white/80 hover:border-primary-200 hover:shadow-sm'
                    }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${selectedAnswer === option
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-slate-300 group-hover:border-primary-400'
                    }`}>
                    {selectedAnswer === option && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span className={`mr-4 text-lg transition-colors duration-200 ${selectedAnswer === option ? 'text-primary-900 font-medium' : 'text-slate-700'
                    }`}>
                    {option}
                  </span>
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 justify-end animate-fade-in-up delay-200">
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {state.questionNumber >= state.totalQuestions
                  ? 'إنهاء الاختبار ✨'
                  : t('common.next') + ' ←'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
