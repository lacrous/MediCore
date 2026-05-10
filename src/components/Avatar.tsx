interface AvatarProps {
  name: string;
  size?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

export default function Avatar({
  name,
  size = 32,
  color = 'var(--mc-text-primary)',
  bgColor = 'var(--mc-surface-elevated)',
  className = '',
}: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const fontSize = size <= 32 ? 14 : size <= 40 ? 13 : 16;

  return (
    <div
      className={`flex items-center justify-center rounded-full flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: bgColor,
      }}
    >
      <span
        className="font-semibold select-none"
        style={{
          color,
          fontSize,
          lineHeight: 1,
        }}
      >
        {initial}
      </span>
    </div>
  );
}
