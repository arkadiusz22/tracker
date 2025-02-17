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
import { updateEntry } from "@/lib/actions";

export function EditDialogContent({
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
        <AlertDialogTitle>Edit entry</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={async () => {
            try {
              const formData = new FormData();
              formData.append("id", entry.id);

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
                description: error instanceof Error ? error.message : undefined,
              });
            } finally {
              onClose();
            }
          }}
        >
          Save
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
