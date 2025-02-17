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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const formSchema = z.object({
  weight: z.number({ required_error: "A weight entry is required" }).positive(),
  date: z.date({
    required_error: "A date entry is required",
  }),
});

// TODO: unify with add new entry form

export function EditDialogContent({
  entry,
  onClose,
}: {
  entry: Entry;
  onClose: () => void;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 0,
      date: new Date(new Date(entry.date).toISOString().split("T")[0]),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("id", entry.id);
      formData.append("weight", values.weight.toString());
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
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Edit entry</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Weight <span className="text-xs text-slate-400">(kg)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min={0}
                    max={1000}
                    step={0.1}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value) || 0);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Button
                    variant={"outline"}
                    disabled
                    className={"pl-3 text-left font-normal"}
                  >
                    {format(field.value, "PPP")}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogAction asChild>
            <Button className="w-full" type="submit">
              Save
            </Button>
          </AlertDialogAction>
        </form>
      </Form>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
