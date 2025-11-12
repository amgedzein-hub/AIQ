export const dynamic = 'force-dynamic';
export const revalidate = false;

export default function NotFoundPage() {
  return (
    <html lang="en">
      <head>
        <title>404 - Not Found</title>
      </head>
      <body
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          background: 'linear-gradient(to bottom right, #f3f4f6, #e0e7ff)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            maxWidth: '448px',
            width: '100%',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>404</div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '16px',
            }}
          >
            Page Not Found
          </h1>
          <p style={{ color: '#6b7280', fontSize: '18px', marginBottom: '32px' }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <form method="GET" action="/ar">
            <button
              type="submit"
              style={{
                display: 'inline-block',
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '12px 32px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Go Home
            </button>
          </form>
        </div>
      </body>
    </html>
  );
}
