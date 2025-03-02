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
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
                  🌳 Creativity Tree
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-300 mr-4">
                {session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {/* Tree takes full screen */}
        <div className="h-screen">
          <MagicalTree />
        </div>

        {/* Stats/Controls - floating at the bottom */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-2">Ideas</h3>
              <p className="text-4xl bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">0</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-2">Connections</h3>
              <p className="text-4xl bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text">0</p>
            </div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
              <p className="text-4xl bg-gradient-to-r from-teal-400 to-green-400 text-transparent bg-clip-text">0%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
