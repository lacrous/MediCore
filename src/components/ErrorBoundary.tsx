import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function ErrorFallback({ error, resetErrorBoundary }: { error: unknown; resetErrorBoundary: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: 'var(--mc-bg)' }}>
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--mc-red-bg)' }}>
          <AlertTriangle size={36} style={{ color: 'var(--mc-red)' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--mc-text-primary)' }}>Something went wrong</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--mc-text-secondary)' }}>
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        <div className="p-4 rounded-xl mb-6 text-start overflow-auto" style={{ backgroundColor: 'var(--mc-surface)', border: '1px solid var(--mc-border)' }}>
          <p className="text-xs font-mono break-all" style={{ color: 'var(--mc-red)' }}>{error instanceof Error ? error.message : String(error)}</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button onClick={resetErrorBoundary}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--mc-orange)', color: 'white' }}>
            <RefreshCw size={16} /> Try Again
          </button>
          <button onClick={() => { navigate('/'); resetErrorBoundary(); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border hover:bg-[var(--mc-surface)]"
            style={{ borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
            <Home size={16} /> Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      {children}
    </ReactErrorBoundary>
  );
}
