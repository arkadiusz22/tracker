import { NewEntryForm } from "@/components/new-entry-form";
import { SignOutButton } from "@/components/sign-out-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-10 p-8">
      <header className="row-start-1 flex items-center gap-2 px-4 transition-[width,height] ease-linear">
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
      </header>

      <main className="row-start-2 flex flex-wrap items-center gap-8 sm:items-start">
        <div className="w-full max-w-sm">
          <NewEntryForm />
        </div>

        <div>
          <SignOutButton />
        </div>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        Footer
      </footer>
    </div>
  );
}
