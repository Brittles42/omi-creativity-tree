import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

// Import MagicalTree with no SSR since it uses browser APIs
const MagicalTree = dynamic(() => import('../components/MagicalTree'), { ssr: false })

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-white">🌳 Creativity Tree</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-300 mr-4">
                {session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tree Visualization */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg shadow-xl p-8 mb-8">
          <MagicalTree />
        </div>

        {/* Stats/Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Ideas</h3>
            <p className="text-4xl text-blue-400">0</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Connections</h3>
            <p className="text-4xl text-green-400">0</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
            <p className="text-4xl text-purple-400">0%</p>
          </div>
        </div>
      </main>
    </div>
  )
}
