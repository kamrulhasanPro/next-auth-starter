import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Email & password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your email",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const usersCollection = await dbConnect("users");

        // check user
        const user = await usersCollection.findOne({ email });
        if (!user) return null;

        // check password
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) return null;

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log({url, baseUrl});
    //   return baseUrl;
    // },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
