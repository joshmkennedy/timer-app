import { Item, ItemContent, ItemTitle, ItemDescription, ItemActions } from "@/components/ui/item";
import { Timer, TimerGroup } from "@/hooks/use-timers";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

export function PreviewInbox({ alerts }: { alerts: TimerGroup['sent'] }) {

  return <div className="">
    <h3 className="font-bold text-muted-foreground mb-2">Inbox</h3>
    {!alerts || alerts.length === 0
      ? <div className="h-32 md:h-96 w-full bg-muted/20 rounded-md border min-w-full flex justify-center items-center">
          <span className="text-muted-foreground/50 text-lg font-bold">All Caught Up!</span>
        </div> : (
        <ScrollArea className="h-64 md:h-96 w-full rounded-md border bg-muted/20">
          <div className="flex flex-col gap-1 p-1">
            {alerts.sort((a, b) => (b.alertAt ?? 0) - (a.alertAt ?? 0)).map((timer) =>
              <DissmissableTimerItem key={timer._id} timer={timer} />)}
          </div>
        </ScrollArea>
      )}
  </div>
}

// TODO:
// show a toast on dismiss.
function DissmissableTimerItem({ timer }: { timer: Timer }) {
  const dismissTimer = useMutation(api.timers.timer.dismissTimer);
  const handleDismiss = () => {
    dismissTimer({ timerId: timer._id });
  }

  const dateString = timer.alertAt ? new Date(timer.alertAt).toLocaleString() : "";
  return <Item variant="outline" className="bg-background items-start justify-between">
    <ItemContent className="">
      <ItemTitle className="text-lg">{timer.title}</ItemTitle>
      <ItemDescription>
        {dateString}
      </ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button variant="outline" size="lg" onClick={handleDismiss}>
        Dismiss
      </Button>
    </ItemActions>
  </Item>
}
