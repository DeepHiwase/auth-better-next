import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidDomains() {
  const domains = ["gamil.com", "yahoo.com", "outlook.com"];

  if (process.env.NODE_ENV === "development") {
    domains.push("example.com");
  }

  return domains;
}

export function normalizeName(name: string) {
  return name
    .trim()
    .replace(/\s+/g, " ") // bob  tom => bob tom
    .replace(/[!a-zA-Z]\s'-/g, "") // bob!45tom => bobtom
    .replace(/\b\w/g, (char) => char.toUpperCase()); // bob tom -> Bob Tom
}
