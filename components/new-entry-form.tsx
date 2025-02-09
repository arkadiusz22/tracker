"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { saveNewEntry } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  weight: z.number({ required_error: "A weight entry is required" }).positive(),
  date: z.date({
    required_error: "A date entry is required",
  }),
});

export function NewEntryForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 0,
      date: new Date(new Date().toISOString().split("T")[0]),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const normalizedDate = new Date(
      Date.UTC(
        values.date.getFullYear(),
        values.date.getMonth(),
        values.date.getDate(),
      ),
    );
    const dateInUTC = normalizedDate.toISOString();

    const formData = new FormData();
    formData.append("weight", values.weight.toString());
    formData.append("date", dateInUTC);

    try {
      const response = await saveNewEntry(formData);

      if (response) {
        toast({
          title: "Unable to add new entry.",
          description: response,
        });
      } else {
        toast({
          title: "New entry added.",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong.",
        // TODO: fix me - TS error
        description: error.message,
      });
    }
  }

  return (
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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
