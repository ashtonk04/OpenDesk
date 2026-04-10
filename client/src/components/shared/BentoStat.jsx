import Icon from './Icon'

export default function BentoStat({ icon, value, label, sublabel, valueColor = 'text-secondary' }) {
  return (
    <div className="bg-surface-container-low rounded-xl p-6 h-40 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <Icon name={icon} size={20} className="text-on-surface-variant" />
        <span className="text-xs font-label text-on-surface-variant uppercase tracking-widest">{label}</span>
      </div>
      <div>
        <p className={`text-3xl font-headline font-bold ${valueColor} tracking-tight`}>{value}</p>
        {sublabel && <p className="text-xs font-label text-on-surface-variant mt-1">{sublabel}</p>}
      </div>
    </div>
  )
}
