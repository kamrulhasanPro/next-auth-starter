import bcrypt from "bcryptjs";
import { collections, dbConnect } from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

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

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user.email) {
        return false;
      }

      try {
        // provider user info
        const payload = {
          ...user,
          provider: account.provider,
          providerId: account.providerAccountId,
          role: "user",
          createdAt: new Date().toISOString(),
        };

        const usersCollection = await dbConnect(collections.USER);

        // isExist
        const isExist = await usersCollection.findOne({
          email: user.email,
          providerId: account.providerAccountId,
        });

        // isExist false then insert that user
        if (!isExist) {
          const result = await usersCollection.insertOne(payload);
          if (!result.acknowledged) {
            return false;
          }
        }

        return true;
      } catch (error) {
        return false;
      }
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
