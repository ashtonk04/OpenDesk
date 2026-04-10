import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Icon from '../components/shared/Icon'

export default function AuthPage() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (mode === 'register') {
      if (!name.trim()) return setError('Please enter your name.')
      if (!email.trim()) return setError('Please enter your email.')
      if (password.length < 6) return setError('Password must be at least 6 characters.')
      if (password !== confirm) return setError('Passwords do not match.')
      const result = register(name.trim(), email.trim(), password)
      if (result.error) setError(result.error)
    } else {
      if (!email.trim() || !password) return setError('Please fill in all fields.')
      const result = login(email.trim(), password)
      if (result.error) setError(result.error)
    }
  }

  function switchMode(next) {
    setMode(next)
    setError('')
    setName('')
    setEmail('')
    setPassword('')
    setConfirm('')
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top brand bar */}
      <header className="glass-header border-b border-outline-variant">
        <div className="flex items-center px-6 py-4 max-w-2xl mx-auto">
          <h1 className="font-headline font-black text-primary tracking-tighter text-lg">
            The Scholarly Observatory
          </h1>
        </div>
      </header>

      {/* Auth card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Editorial heading */}
          <div className="mb-8">
            <p className="font-label text-secondary font-semibold uppercase tracking-widest text-[10px] mb-2">
              {mode === 'login' ? 'Welcome back' : 'Get started'}
            </p>
            <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tight leading-tight">
              {mode === 'login' ? 'Sign in to\nyour account.' : 'Create your\naccount.'}
            </h2>
          </div>

          {/* Form card */}
          <div className="bg-surface-container-low rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Name — register only */}
              {mode === 'register' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <Icon name="person" size={18} className="absolute left-3 text-on-surface-variant pointer-events-none" />
                    <input
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full pl-9 pr-4 py-3 bg-surface-container-highest rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm font-label text-on-surface placeholder:text-on-surface-variant/60 transition-shadow"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                  Email
                </label>
                <div className="relative flex items-center">
                  <Icon name="mail" size={18} className="absolute left-3 text-on-surface-variant pointer-events-none" />
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-9 pr-4 py-3 bg-surface-container-highest rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm font-label text-on-surface placeholder:text-on-surface-variant/60 transition-shadow"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Icon name="lock" size={18} className="absolute left-3 text-on-surface-variant pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'register' ? 'Min. 6 characters' : 'Your password'}
                    className="w-full pl-9 pr-11 py-3 bg-surface-container-highest rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm font-label text-on-surface placeholder:text-on-surface-variant/60 transition-shadow"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 text-on-surface-variant active:scale-90 transition-transform"
                  >
                    <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={18} />
                  </button>
                </div>
              </div>

              {/* Confirm password — register only */}
              {mode === 'register' && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-label font-semibold text-on-surface-variant uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <Icon name="lock_reset" size={18} className="absolute left-3 text-on-surface-variant pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full pl-9 pr-4 py-3 bg-surface-container-highest rounded-xl border-none outline-none focus:ring-2 focus:ring-primary/30 text-sm font-label text-on-surface placeholder:text-on-surface-variant/60 transition-shadow"
                    />
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 bg-error-container rounded-xl">
                  <Icon name="error" size={16} className="text-on-error-container flex-shrink-0" />
                  <p className="text-xs font-label text-on-error-container">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="mt-1 w-full py-3.5 rounded-xl font-headline font-bold text-on-primary text-sm tracking-wide active:scale-[0.98] transition-transform"
                style={{ background: 'linear-gradient(135deg, #67022b, #861f41)' }}
              >
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>

          {/* Switch mode */}
          <div className="mt-5 text-center">
            {mode === 'login' ? (
              <p className="text-sm font-label text-on-surface-variant">
                Don't have an account?{' '}
                <button
                  onClick={() => switchMode('register')}
                  className="font-semibold text-primary active:opacity-70 transition-opacity"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-sm font-label text-on-surface-variant">
                Already have an account?{' '}
                <button
                  onClick={() => switchMode('login')}
                  className="font-semibold text-primary active:opacity-70 transition-opacity"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
