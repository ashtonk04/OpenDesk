import { useNavigate } from 'react-router-dom'
import Icon from '../shared/Icon'

export default function AppHeader({ mode = 'home', title = 'The Scholarly Observatory', onMenu }) {
  const navigate = useNavigate()

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
        <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
          <Icon name="person" className="text-on-surface-variant" />
        </div>
      </div>
    </header>
  )
}
