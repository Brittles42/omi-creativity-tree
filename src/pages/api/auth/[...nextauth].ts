import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Test auth for development
        if (process.env.NODE_ENV === 'development' || !process.env.OMI_CLIENT_ID) {
          if (credentials?.username === process.env.TEST_USERNAME && 
              credentials?.password === process.env.TEST_PASSWORD) {
            return {
              id: '1',
              name: 'Test User',
              email: 'test@example.com',
            }
          }
        }
        
        // TODO: Add OMI auth here
        // Will need:
        // - OMI_CLIENT_ID
        // - OMI_CLIENT_SECRET
        // - OMI_AUTH_URL
        
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub
      return session
    }
  }
})
