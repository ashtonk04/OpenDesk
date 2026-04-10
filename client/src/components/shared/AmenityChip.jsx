import Icon from './Icon'

export default function AmenityChip({ icon, label, className = '' }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-high rounded-full ${className}`}>
      <Icon name={icon} size={14} className="text-on-surface-variant" />
      <span className="text-xs font-label text-on-surface-variant font-medium">{label}</span>
    </div>
  )
}
