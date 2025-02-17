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
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { DeleteDialogContent } from "./delete-dialog-content";
import { EditDialogContent } from "./edit-dialog-content";

export function EntryActionsDropdown({ entry }: { entry: Entry }) {
  const [openedDialogType, setOpenedDialogType] = useState<
    "edit" | "delete" | null
  >(null);

  const onClose = () => setOpenedDialogType(null);

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
        <EditDialogContent entry={entry} onClose={onClose} />
      )}

      {openedDialogType === "delete" && (
        <DeleteDialogContent entry={entry} onClose={onClose} />
      )}
    </AlertDialog>
  );
}
