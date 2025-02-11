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
import { EntryActionsDropdown } from "./entry-actions-dropdown";

export async function EntriesTable() {
  const entries = await getEntries();

  const average =
    entries.length >= 2
      ? entries.reduce((acc, { weight }) => acc + weight, 0) / entries.length
      : undefined;

  return (
    <div>
      {!!average && (
        <div className="mb-6 text-center">
          Your avarage from last
          <span className="font-semibold"> {entries.length} </span>
          days is
          <span className="font-semibold"> {average.toFixed(2)}</span>.
        </div>
      )}
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
                <TableCell className="text-right">{entry.weight} </TableCell>
                <TableCell className="p-0 text-center">
                  <EntryActionsDropdown entry={entry} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
