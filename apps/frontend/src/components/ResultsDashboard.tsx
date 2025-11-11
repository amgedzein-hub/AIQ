'use client';

import { useTranslations } from 'next-intl';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface Domain {
  name: string;
  score: number;
  percentile: number;
}

interface ResultsDashboardProps {
  totalScore: number;
  percentile: number;
  domains: Domain[];
  interpretation: string;
}

export default function ResultsDashboard({
  totalScore,
  percentile,
  domains,
  interpretation,
}: ResultsDashboardProps) {
  const t = useTranslations();

  const radarData = domains.map((d) => ({
    subject: d.name,
    score: d.score,
    fullMark: 150,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
            {t('results.your_score')}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg">
              <p className="text-gray-600 text-lg mb-2">Overall IQ</p>
              <p className="text-6xl font-bold text-indigo-600">{totalScore}</p>
              <p className="text-gray-600 mt-2">
                {t('results.percentile')}: {percentile}%
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Interpretation
              </h3>
              <p className="text-ar prose-ar text-gray-700 leading-relaxed">
                {interpretation}
              </p>
            </div>
          </div>
        </div>

        {/* Domain Scores */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {t('results.domain_scores')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={domains}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Radar Chart */}
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 150]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#4f46e5"
                    fill="#4f46e5"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Domain Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
            {domains.map((domain) => (
              <div
                key={domain.name}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 text-center"
              >
                <h4 className="font-semibold text-gray-900 mb-2">
                  {domain.name}
                </h4>
                <p className="text-3xl font-bold text-indigo-600 mb-1">
                  {domain.score}
                </p>
                <p className="text-sm text-gray-600">
                  {domain.percentile}th percentile
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition">
            {t('results.view_report')}
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition">
            Share Results
          </button>
        </div>
      </div>
    </div>
  );
}
