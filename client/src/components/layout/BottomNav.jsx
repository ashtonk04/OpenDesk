import { useNavigate, useLocation } from 'react-router-dom'
import Icon from '../shared/Icon'

const TABS = [
  { label: 'Explore', icon: 'explore', path: '/' },
  { label: 'Reports', icon: 'campaign', path: '/reports' },
  { label: 'Saved', icon: 'bookmark_border', path: '/saved' },
  { label: 'Profile', icon: 'person', path: '/profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-header rounded-t-3xl shadow-[0_-12px_24px_-4px_rgba(26,28,28,0.06)]">
      <div className="flex items-center justify-around px-4 pt-3 pb-6 max-w-2xl mx-auto">
        {TABS.map(tab => {
          const active = location.pathname === tab.path
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 min-w-[56px] active:scale-95 transition-transform"
            >
              <div className={`flex items-center justify-center w-14 h-8 rounded-full transition-colors ${active ? 'bg-primary-container' : ''}`}>
                <Icon
                  name={tab.icon}
                  filled={active}
                  size={22}
                  className={active ? 'text-on-primary-container' : 'text-on-surface-variant'}
                />
              </div>
              <span className={`text-[10px] font-label font-medium ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
