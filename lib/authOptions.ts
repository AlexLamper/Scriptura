import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "./mongodb";
import User from "../models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, profile }) {
      try {
        await connectMongoDB();

        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            name: user.name || profile?.name || "User",
            email: user.email,
            image: user.image || "",
            bio: "",
          });
        }
        return true;
      } catch (error) {
        console.error("Error during sign in callback:", error);
        return false;
      }
    },
    async session({ session }) {
      if (session.user?.email) {
        await connectMongoDB();
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user._id.toString();
          session.user.isAdmin = user.isAdmin || false;
        }
      }
      return session;
    },
  },
};
