interface SkeletonProps { className?: string; width?: string | number; height?: string | number; circle?: boolean; }

export default function Skeleton({ className = '', width, height, circle }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-[var(--mc-surface-elevated)] ${circle ? 'rounded-full' : 'rounded-lg'} ${className}`}
      style={{ width, height }}
    />
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b" style={{ borderColor: 'var(--mc-border)' }}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="flex-1" height={16} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-3">
          <div className="flex items-center gap-3 flex-[2.5]">
            <Skeleton circle width={32} height={32} />
            <Skeleton className="flex-1" height={14} />
          </div>
          {Array.from({ length: cols - 1 }).map((_, j) => (
            <Skeleton key={j} className="flex-1" height={14} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl p-6 shadow-mc-card" style={{ backgroundColor: 'var(--mc-surface)' }}>
      <div className="flex items-center justify-between">
        <Skeleton circle width={44} height={44} />
        <Skeleton width={80} height={36} />
      </div>
      <Skeleton className="mt-4" width={120} height={32} />
      <Skeleton className="mt-1" width={100} height={14} />
      <div className="flex items-center gap-1.5 mt-2">
        <Skeleton width={50} height={12} />
        <Skeleton width={80} height={12} />
      </div>
    </div>
  );
}

export function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}
