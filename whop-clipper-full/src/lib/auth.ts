import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUser } from "@/lib/userStore";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.YOUTUBE_CLIENT_ID!,
      clientSecret: process.env.YOUTUBE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile email",
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user exists and has completed OTP verification
      const existingUser = getUser(user.email!);
      
      if (existingUser && !existingUser.isVerified) {
        // User hasn't completed OTP verification, don't allow sign in yet
        return "/login?error=otp_required&email=" + encodeURIComponent(user.email!);
      }
      
      // Create user if doesn't exist (auto-verify for OAuth since email is verified by Google)
      // Default roles for new users: ["creator", "clipper"]
      if (!existingUser) {
        createUser({
          email: user.email!,
          name: user.name,
          image: user.image,
          roles: ["creator", "clipper"], // Default roles for new users
          isVerified: true, // Google OAuth verifies email
          otpCode: null,
          otpExpires: null,
        });
      }
      
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.accessToken) {
        session.accessToken = token.accessToken as string;
        // Add user ID and roles to session
        const user = getUser(session.user.email!);
        if (user) {
          session.user.id = user.id;
          (session.user as any).roles = user.roles;
        }
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
