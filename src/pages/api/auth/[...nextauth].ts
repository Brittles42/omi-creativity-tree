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
        // This is where we'll add OMI auth later
        // For now, basic test auth
        if (credentials?.username === 'test' && credentials?.password === 'test') {
          return {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
          }
        }
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
      // Add user info to session
      session.user.id = token.sub
      return session
    }
  }
})
