export default function SegmentedBar({ percentage, segments = 10, className = '' }) {
  const filled = Math.round((percentage / 100) * segments)
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={`flex-1 h-1.5 rounded-full transition-colors ${
            i < filled ? 'bg-secondary' : 'bg-surface-container-highest'
          }`}
        />
      ))}
    </div>
  )
}
