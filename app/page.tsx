import { NewEntryForm } from "@/components/new-entry-form";
import { SignOutButton } from "@/components/sign-out-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EntriesTable } from "@/components/entries-table";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] justify-items-center gap-10 p-4">
      <header className="row-start-1 flex w-full items-center justify-between px-4 transition-[width,height] ease-linear">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Tracker</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SignOutButton />
      </header>

      <main className="row-start-2 flex flex-wrap items-center gap-10 self-start sm:items-start">
        <div className="w-full max-w-sm">
          <NewEntryForm />
        </div>

        <div className="w-full max-w-sm">
          <Suspense>
            <EntriesTable />
          </Suspense>
        </div>
      </main>

      <footer className="row-start-3 flex w-full items-center justify-center px-4 text-sm">
        <span>
          {`\"Tracker\" by `}
          <Link className="font-semibold" href="https://github.com/arkadiusz22">
            arkadiusz22
          </Link>
          {`${" @2025"}`}
        </span>
      </footer>
    </div>
  );
}
