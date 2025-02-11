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

export function EntryActionsDropdown({ entry }: { entry: Entry }) {
  const formData = new FormData();
  formData.append("id", entry.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            // TODO: add edit popup, get new data and display toast
            formData.append(
              "weight",
              (entry.weight + (Math.random() - 0.5) * 5).toFixed(2).toString(),
            );
            formData.append("date", entry.date);
            updateEntry(formData);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            // TOODO: add confirmation popup and display toast
            removeEntry(formData);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
