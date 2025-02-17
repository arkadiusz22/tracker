import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Entry } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { removeEntry } from "@/lib/actions";

export function DeleteDialogContent({
  entry,
  onClose,
}: {
  entry: Entry;
  onClose: () => void;
}) {
  const { toast } = useToast();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete selected
          entry.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={async () => {
            try {
              const formData = new FormData();
              formData.append("id", entry.id);

              await removeEntry(formData);
              toast({
                title: "Entry deleted.",
              });
            } catch (error) {
              toast({
                title: "Something went wrong.",
                description: error instanceof Error ? error.message : undefined,
              });
            } finally {
              onClose();
            }
          }}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
