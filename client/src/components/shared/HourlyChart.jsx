const HOURS = ['8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p', '12a', '2a']

function getBarColor(pct, isNow) {
  if (isNow) return 'bg-secondary'
  if (pct >= 80) return 'bg-primary'
  if (pct >= 50) return 'bg-primary-container'
  return 'bg-surface-container-highest'
}

export default function HourlyChart({ data, currentHour = 6 }) {
  return (
    <div className="bg-surface-container-low rounded-2xl p-6">
      <p className="text-xs font-label text-on-surface-variant uppercase tracking-widest mb-4">
        Hourly Busyness
      </p>

      <div className="flex items-end gap-2 h-36">
        {data.map((pct, i) => {
          const isNow = i === currentHour
          const height = `${Math.max(pct, 8)}%`

          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
              <div className="w-full h-28 flex items-end">
                <div
                  title={`${pct}% busy`}
                  className={`w-full rounded-t-md transition-all ${getBarColor(pct, isNow)} ${
                    isNow ? 'ring-2 ring-secondary ring-inset' : ''
                  }`}
                  style={{ height }}
                />
              </div>

              <span
                className={`text-[9px] font-label ${
                  isNow
                    ? 'text-secondary font-semibold'
                    : 'text-on-surface-variant'
                }`}
              >
                {HOURS[i]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}