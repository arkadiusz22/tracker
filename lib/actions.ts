"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { Entry, User } from "./types";
import path from "path";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function getUser(username: string): Promise<User | undefined> {
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

export async function getEntries(): Promise<Entry[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "entries.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents) as Entry[];

    if (data.length >= 30) {
      return data.slice(-30, data.length);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Failed to fetch entries:", error);
    throw new Error("Failed to fetch entries.");
  }
}

export async function saveNewEntry(formData: FormData): Promise<string | void> {
  try {
    const filePath = path.join(process.cwd(), "data", "entries.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContents) as Entry[];

    const weight = parseFloat(formData.get("weight") as string);
    const date = new Date(formData.get("date") as string);

    const dateOnly = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
    );

    const newEntry: Entry = {
      weight,
      date: dateOnly.toISOString(),
    };

    if (data.some((entry) => entry.date === newEntry.date)) {
      return "There is already an entry for the selected date.";
    }

    data.push(newEntry);

    data.sort(
      (entryA, entryB) =>
        new Date(entryB.date).getTime() - new Date(entryA.date).getTime(),
    );

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to add new entry:", error);
    throw new Error("Failed to add new entry");
  }
}
