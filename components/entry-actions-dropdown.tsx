"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Entry } from "@/lib/types";
import { removeEntry, updateEntry } from "@/lib/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function EntryActionsDropdown({ entry }: { entry: Entry }) {
  const [openedDialogType, setOpenedDialogType] = useState<
    "edit" | "delete" | null
  >(null);

  const { toast } = useToast();

  const formData = new FormData();
  formData.append("id", entry.id);

  return (
    <AlertDialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <AlertDialogTrigger
            asChild
            onClick={() => {
              setOpenedDialogType("edit");
            }}
          >
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogTrigger
            asChild
            onClick={() => {
              setOpenedDialogType("delete");
            }}
          >
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      {openedDialogType === "edit" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit entry</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenedDialogType(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  formData.append(
                    "weight",
                    (entry.weight + (Math.random() - 0.5) * 5)
                      .toFixed(2)
                      .toString(),
                  );
                  formData.append("date", entry.date);

                  await updateEntry(formData);

                  toast({
                    title: "Entry updated.",
                  });
                } catch (error) {
                  toast({
                    title: "Something went wrong.",
                    description:
                      error instanceof Error ? error.message : undefined,
                  });
                }
              }}
            >
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}

      {openedDialogType === "delete" && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              selected entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenedDialogType(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await removeEntry(formData);
                  toast({
                    title: "Entry deleted.",
                  });
                } catch (error) {
                  toast({
                    title: "Something went wrong.",
                    description:
                      error instanceof Error ? error.message : undefined,
                  });
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
