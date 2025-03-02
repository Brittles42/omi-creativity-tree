import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'

// Extend the built-in session type
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"]
  }
}

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
      if (session.user) {
        session.user.id = token.sub || '1'
      }
      return session
    }
  }
})
