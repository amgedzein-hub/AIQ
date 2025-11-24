import ResultsView from '@/components/ResultsView';

export const dynamic = 'force-dynamic';

export default async function ResultsPage({
    params,
}: {
    params: Promise<{ sessionId: string }>;
}) {
    const { sessionId } = await params;
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
            <ResultsView sessionId={sessionId} />
        </div>
    );
}
