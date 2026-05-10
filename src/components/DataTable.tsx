import { useState, useMemo, useCallback } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  searchable?: boolean;
  searchKeys?: string[];
  pageSize?: number;
  pageSizeOptions?: number[];
  onRowClick?: (row: T) => void;
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
}

type SortDir = 'asc' | 'desc' | null;

export default function DataTable<T>({
  data, columns, keyExtractor, searchable = true, searchKeys, pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50], onRowClick, actions, emptyMessage = 'No data found'
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setCurrentPage(1);
  }, [sortKey, sortDir]);

  const filtered = useMemo(() => {
    let result = [...data];
    if (search && searchKeys) {
      const q = search.toLowerCase();
      result = result.filter(row => searchKeys.some(k => String((row as any)[k]).toLowerCase().includes(q)));
    }
    if (sortKey && sortDir) {
      result.sort((a, b) => {
        const av = (a as any)[sortKey];
        const bv = (b as any)[sortKey];
        if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
        const as = String(av).toLowerCase();
        const bs = String(bv).toLowerCase();
        return sortDir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as);
      });
    }
    return result;
  }, [data, search, searchKeys, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / currentPageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * currentPageSize, safePage * currentPageSize);

  const start = filtered.length === 0 ? 0 : (safePage - 1) * currentPageSize + 1;
  const end = Math.min(safePage * currentPageSize, filtered.length);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        {searchable && (
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--mc-text-muted)' }} />
            <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border text-sm outline-none transition-all focus:ring-2"
              style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }} />
          </div>
        )}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} style={{ color: 'var(--mc-text-muted)' }} />
          <select value={currentPageSize} onChange={e => { setCurrentPageSize(Number(e.target.value)); setCurrentPage(1); }}
            className="px-2 py-1.5 rounded-lg border text-xs outline-none" style={{ backgroundColor: 'var(--mc-bg)', borderColor: 'var(--mc-border)', color: 'var(--mc-text-primary)' }}>
            {pageSizeOptions.map(o => <option key={o} value={o}>{o} per page</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--mc-border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--mc-bg)' }}>
                {columns.map(col => (
                  <th key={col.key} className="px-4 py-3 text-start font-semibold text-xs whitespace-nowrap select-none"
                    style={{ color: 'var(--mc-text-secondary)', width: col.width }}>
                    {col.sortable ? (
                      <button onClick={() => handleSort(col.key)} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
                        {col.header}
                        {sortKey === col.key
                          ? (sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)
                          : <ArrowUpDown size={12} style={{ color: 'var(--mc-text-muted)' }} />}
                      </button>
                    ) : col.header}
                  </th>
                ))}
                {actions && <th className="px-4 py-3" style={{ width: '60px' }} />}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--mc-border)' }}>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 py-12 text-center text-sm" style={{ color: 'var(--mc-text-muted)' }}>
                    {emptyMessage}
                  </td>
                </tr>
              ) : paginated.map(row => (
                <tr key={keyExtractor(row)} onClick={() => onRowClick?.(row)}
                  className={`transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  style={{ backgroundColor: 'var(--mc-surface)' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--mc-bg)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--mc-surface)')}>
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--mc-text-primary)' }}>
                      {col.render ? col.render(row) : String((row as any)[col.key] ?? '-')}
                    </td>
                  ))}
                  {actions && <td className="px-4 py-3">{actions(row)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-xs" style={{ color: 'var(--mc-text-muted)' }}>Showing {start}-{end} of {filtered.length}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={safePage <= 1}
            className="p-1.5 rounded-lg border transition-all disabled:opacity-30" style={{ borderColor: 'var(--mc-border)' }}>
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1).map((p, i, arr) => (
            <div key={p} className="flex items-center gap-1">
              {i > 0 && arr[i - 1] !== p - 1 && <span className="px-1 text-xs" style={{ color: 'var(--mc-text-muted)' }}>...</span>}
              <button onClick={() => setCurrentPage(p)}
                className="min-w-[32px] h-8 px-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: p === safePage ? 'var(--mc-orange)' : 'transparent',
                  color: p === safePage ? 'white' : 'var(--mc-text-secondary)',
                }}>{p}</button>
            </div>
          ))}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={safePage >= totalPages}
            className="p-1.5 rounded-lg border transition-all disabled:opacity-30" style={{ borderColor: 'var(--mc-border)' }}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
