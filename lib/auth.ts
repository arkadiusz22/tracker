import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import path from "path";
import fs from "fs/promises";
import bcrypt from "bcrypt";

export type User = {
  id: string;
  name: string;
  password: string;
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string().min(4), password: z.string().min(4) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await getUser(username);

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
});

async function getUser(username: string): Promise<User | undefined> {
  try {
    const filePath = path.join(process.cwd(), "data", "users.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents) as User[];

    return data.find((user) => user.name === username);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
