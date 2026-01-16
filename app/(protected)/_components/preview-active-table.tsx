import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TimerGroup } from "@/hooks/use-timers";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function PreviewActiveTable({ alerts }: { alerts: TimerGroup['active'] }) {
  const sorted = alerts.sort((a, b) => (a.alertAt ?? 0) - (b.alertAt ?? 0));
  return <div className="" >
    <h3 className="font-bold text-muted-foreground mb-2">Currently Running</h3>
    <div className=" border rounded-md flex flex-col max-h-96 overflow-hidden">
    <Table className="h-full overflow-y-auto ">
      <TableHeader className="font-bold sticky top-0 bg-background shadow border-b border-b-muted">
        <TableRow>
          <TableHead className="w-full">Message</TableHead>
          <TableHead>Alerts In</TableHead>
          <TableHead>Alert Date</TableHead>
          <TableHead>Created Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {sorted.map((timer) => <TableRow key={timer._id}>
          <TableCell className="w-full text-base">{timer.title}</TableCell>
          <TableCell>
            {timer.alertAt ? dayjs(timer.alertAt).fromNow() : ""}
          </TableCell>
          <TableCell className="text-right  text-muted-foreground">
            {timer.alertAt ? dayjs(timer.alertAt).format("MMM D, HH:mm") : ""}
          </TableCell>
          <TableCell className="text-right  text-muted-foreground">
            {timer._creationTime ? dayjs(timer._creationTime).format("MMM D, HH:mm") : ""}
          </TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
    </div>
  </div>
}
