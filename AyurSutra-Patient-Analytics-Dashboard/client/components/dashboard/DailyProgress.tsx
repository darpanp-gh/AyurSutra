import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DailyLogItem } from "@/lib/therapyData";
import { useState } from "react";

const emojis = ["😟","🙁","😐","🙂","😊"] as const;

function LogRow({ item }: { item: DailyLogItem }) {
  const [mood, setMood] = useState(item.mood);
  return (
    <div className="rounded-lg border p-3 bg-background hover:shadow-sm transition">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <div className="font-semibold">Day {item.day}</div>
        <div className="text-muted-foreground">{new Date(item.date).toLocaleDateString()}</div>
        <div className="ml-auto inline-flex items-center gap-1 text-xs">Mood:
          <div className="flex gap-1">
            {emojis.map((e, i) => (
              <button key={i} onClick={() => setMood((i+1) as any)} className={`h-7 w-7 grid place-items-center rounded-md hover:bg-muted transition ${mood === (i+1) ? "ring-1 ring-ring" : ""}`} aria-label={`Mood ${i+1}`}>{e}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm">
        <span className="text-muted-foreground">Symptoms:</span> {item.symptoms.join(", ") || "None"}
      </div>
      <div className="mt-1 text-sm">
        <span className="text-muted-foreground">Emotional:</span> {item.emotionalStatus} • <span className="text-muted-foreground">Physical:</span> {item.physicalStatus}
      </div>
      {item.doctorNotes ? (
        <div className="mt-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-2">Doctor: {item.doctorNotes}</div>
      ) : null}
    </div>
  );
}

export default function DailyProgress({ logs }: { logs: DailyLogItem[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Daily Progress Log</CardTitle>
        <div className="text-sm text-muted-foreground">Day-by-day updates across the therapy timeline</div>
      </CardHeader>
      <CardContent className="space-y-3">
        {logs.map((l) => (
          <LogRow key={l.day} item={l} />
        ))}
      </CardContent>
    </Card>
  );
}
