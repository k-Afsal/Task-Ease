import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TaskSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Task</TableHead>
          <TableHead className="text-right w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(3)].map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-6 w-6 rounded-sm" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 flex-1" />
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
