import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDB from "../../../../libs/mongodb";
import User from "../../../../models/User";

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
          // Create the new user (store fields that are available)
          await User.create({
            name: user.name || (profile && profile.name) || "User",
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
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
