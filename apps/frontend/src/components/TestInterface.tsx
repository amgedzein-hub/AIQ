'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';

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

  const fetchNextQuestion = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await axios.post(`${API_URL}/questions/next`, {
        sessionId,
        currentResponses: state.responses,
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
  }, [sessionId, state.responses]);

  useEffect(() => {
    fetchNextQuestion();
  }, [fetchNextQuestion]);

  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !state.currentQuestion) return;

    try {
      setState((prev) => ({
        ...prev,
        responses: {
          ...prev.responses,
          [state.currentQuestion!.id]: selectedAnswer,
        },
      }));

      if (state.questionNumber >= state.totalQuestions) {
        // Test completed, redirect to results
        window.location.href = `/results/${sessionId}`;
      } else {
        setState((prev) => ({
          ...prev,
          questionNumber: prev.questionNumber + 1,
        }));
        await fetchNextQuestion();
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
    <div className="max-w-2xl mx-auto p-6">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {t('test.question')} {state.questionNumber} {t('test.of')}{' '}
            {state.totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(
              (state.questionNumber / state.totalQuestions) * 100
            )}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(state.questionNumber / state.totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-4">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
            {state.currentQuestion.domain}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-ar prose-ar">
          {state.currentQuestion.text_ar}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {state.currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition ${selectedAnswer === option
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
                }`}
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="w-5 h-5"
              />
              <span className="ml-3 text-ar">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 justify-end">
        <button
          onClick={handleSubmitAnswer}
          disabled={!selectedAnswer}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-lg transition"
        >
          {state.questionNumber >= state.totalQuestions
            ? 'Complete Test'
            : t('common.next')}
        </button>
      </div>
    </div>
  );
}
