import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Timer } from "@/hooks/use-timers";

function LargeCell({ children }: { children: React.ReactNode }) {
  return <TableCell className="py-4">
    {children}
  </TableCell>
}

export function BasicTimerTable({ timers }: { timers: Timer[] }) {
  return <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Message</TableCell>
        <TableCell>Created Date</TableCell>
        <TableCell>Alert Date</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {timers.map((timer) => <TableRow key={timer._id}>
        <LargeCell>{timer.title}</LargeCell>
        <LargeCell>{timer._creationTime ? new Date(timer._creationTime).toLocaleString() : ""}</LargeCell>
        <LargeCell>{timer.alertAt ? new Date(timer.alertAt).toLocaleString() : ""}</LargeCell>
      </TableRow>)}
    </TableBody>
  </Table>
}
