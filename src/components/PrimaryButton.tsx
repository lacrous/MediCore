import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export default function PrimaryButton({
  children,
  icon,
  onClick,
  className = '',
  fullWidth = false,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2
        px-5 py-2.5 rounded-lg
        text-sm font-semibold text-white
        shadow-mc-button
        transition-all duration-200 ease-out
        hover:shadow-mc-button-hover hover:-translate-y-px
        active:translate-y-0 active:scale-[0.97]
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{ backgroundColor: 'var(--mc-orange)' }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.backgroundColor = 'var(--mc-orange-hover)';
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.backgroundColor = 'var(--mc-orange)';
      }}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
