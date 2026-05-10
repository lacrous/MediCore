import React from 'react';

interface SecondaryButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export default function SecondaryButton({
  children,
  icon,
  onClick,
  className = '',
  fullWidth = false,
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        px-5 py-2.5 rounded-lg
        text-sm font-semibold
        border transition-all duration-200 ease-out
        hover:bg-[var(--mc-surface-elevated)] hover:border-[var(--mc-border-active)]
        active:scale-[0.97]
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--mc-border)',
        color: 'var(--mc-text-primary)',
      }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
