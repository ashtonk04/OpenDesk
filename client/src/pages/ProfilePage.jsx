import AppHeader from '../components/layout/AppHeader'
import BottomNav from '../components/layout/BottomNav'
import { useAuth } from '../contexts/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-surface pb-24">
      <AppHeader title="Profile" />

      <main className="pt-24 px-4 max-w-2xl mx-auto">
        <div className="bg-surface-container-low rounded-2xl p-5 shadow-sm">
          <h1 className="font-headline font-bold text-xl text-on-surface mb-2">
            Your Profile
          </h1>

          <p className="text-on-surface-variant text-sm mb-4">
            Manage your OpenDesk account and reporting activity.
          </p>

          <div className="space-y-2 mb-6">
            <p className="text-sm">
              <strong>Name:</strong> {user?.name ?? 'OpenDesk User'}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {user?.email ?? 'No email available'}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full py-3 rounded-full bg-error text-white font-label font-semibold"
          >
            Sign Out
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}