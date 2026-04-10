import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../shared/Icon'
import { useAuth } from '../../contexts/AuthContext'

export default function AppHeader({ mode = 'home', title = 'The Scholarly Observatory', onMenu }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  if (mode === 'detail') {
    return (
      <header className="fixed top-0 w-full z-50 glass-header">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container active:scale-95 transition-all"
          >
            <Icon name="arrow_back" className="text-on-surface" />
          </button>
          <h1 className="font-headline font-bold text-base text-on-surface tracking-tight">{title}</h1>
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container active:scale-95 transition-all">
              <Icon name="share" className="text-on-surface-variant" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container active:scale-95 transition-all">
              <Icon name="favorite_border" className="text-on-surface-variant" />
            </button>
          </div>
        </div>
      </header>
    )
  }

  // home mode
  return (
    <header className="fixed top-0 w-full z-50 glass-header">
      <div className="flex justify-between items-center px-6 py-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-3">
          <button onClick={onMenu} className="active:scale-95 transition-transform">
            <Icon name="menu" className="text-primary" />
          </button>
          <h1 className="font-headline font-black text-primary tracking-tighter text-lg">{title}</h1>
        </div>

        {/* User avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(v => !v)}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center active:scale-95 transition-transform"
          >
            <span className="font-headline font-bold text-on-primary text-sm">
              {user?.name?.[0]?.toUpperCase() ?? '?'}
            </span>
          </button>

          {showUserMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              {/* Menu */}
              <div className="absolute right-0 top-11 z-50 bg-surface-container-low rounded-2xl shadow-lg border border-outline-variant min-w-[180px] overflow-hidden">
                <div className="px-4 py-3 border-b border-outline-variant">
                  <p className="font-headline font-bold text-on-surface text-sm truncate">{user?.name}</p>
                  <p className="font-label text-on-surface-variant text-xs truncate">{user?.email}</p>
                </div>
                <button
                  onClick={() => { setShowUserMenu(false); logout() }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm font-label text-error hover:bg-error-container/50 transition-colors"
                >
                  <Icon name="logout" size={16} className="text-error" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
