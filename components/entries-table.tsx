import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { getEntries } from "@/lib/actions";

// TODO: add options to edit and remove existing entries

export async function EntriesTable() {
  const entries = await getEntries();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Weight</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => {
          const utcDate = new Date(entry.date);
          return (
            <TableRow key={entry.date}>
              <TableCell>{format(utcDate, "PPP")}</TableCell>
              <TableCell className="text-right">{entry.weight}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
