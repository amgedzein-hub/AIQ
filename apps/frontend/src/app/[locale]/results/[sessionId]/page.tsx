import ResultsView from '@/components/ResultsView';

export default function ResultsPage({
    params: { sessionId },
}: {
    params: { sessionId: string };
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
            <ResultsView sessionId={sessionId} />
        </div>
    );
}
