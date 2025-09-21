import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PanchakarmaProcedure, TherapyProgress as TProgress } from "@/lib/therapyData";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Droplets, Flower2, Leaf, Sparkles, Wind } from "lucide-react";
import { useMemo, useState } from "react";

const stepIcons: Record<PanchakarmaProcedure, React.ReactNode> = {
  Vamana: <Wind className="h-4 w-4" />, // symbolism
  Virechana: <Droplets className="h-4 w-4" />,
  Basti: <Leaf className="h-4 w-4" />,
  Nasya: <Flower2 className="h-4 w-4" />,
  Raktamokshana: <Sparkles className="h-4 w-4" />,
};

function Circle({ label, value, color }: { label: string; value: number; color: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="therapy-circle">
      <div className="relative inline-block">
        <svg className="[--size:clamp(104px,20vw,160px)] h-[var(--size)] w-[var(--size)]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} stroke="hsl(var(--border))" strokeWidth="8" fill="none" />
          <circle cx="50" cy="50" r={radius} stroke={color} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} className="ring-progress" strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-xl md:text-2xl font-bold">{Math.round(value)}%</div>
      </div>
      <span className="text-xs md:text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export default function TherapyProgress({ progress }: { progress: TProgress }) {
  const stages = [
    { key: "purva", label: "Purva Karma", color: "hsl(142 45% 35%)" },
    { key: "pradhana", label: "Pradhana Karma", color: "hsl(33 94% 54%)" },
    { key: "paschat", label: "Paschat Karma", color: "hsl(210 80% 45%)" },
  ] as const;

  const procEntries = useMemo(() => Object.entries(progress.procedures) as [PanchakarmaProcedure, (typeof progress)["procedures"][PanchakarmaProcedure]][], [progress]);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? procEntries : procEntries.slice(0, 3);

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Therapy Progress</CardTitle>
        <div className="text-sm text-muted-foreground">Overall completion across Panchakarma phases</div>
      </CardHeader>
      <CardContent className="pt-4 grid xl:grid-cols-2 gap-8">
        <div>
          <div className="therapy-progress-container">
            {stages.map((s) => (
              <Circle key={s.key} label={s.label} value={progress.stageCompletion[s.key]} color={s.color} />
            ))}
          </div>
        </div>
        <div className="space-y-3 xl:justify-self-end w-full">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Procedures</div>
            {procEntries.length > 3 && (
              <Button size="sm" variant="outline" onClick={() => setShowAll((v) => !v)}>
                {showAll ? "Show less" : "Show all"}
              </Button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 max-w-xl">
            {visible.map(([name, meta]) => (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <div className={`flex items-start gap-3 rounded-lg border p-3 hover:shadow-md transition bg-background ${meta.completed ? "border-green-300/60" : ""}`}>
                    <div className={`h-8 w-8 rounded-full grid place-items-center ${meta.completed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {stepIcons[name]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{name}</div>
                        {meta.completed ? (
                          <span className="inline-flex items-center gap-1 text-xs text-green-700"><CheckCircle2 className="h-3.5 w-3.5"/>Done</span>
                        ) : (
                          <span className="text-xs text-amber-700">In progress</span>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{meta.purpose}</div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <div className="font-medium mb-1">{name}</div>
                  <div className="text-xs"><span className="font-semibold">Purpose:</span> {meta.purpose}</div>
                  <div className="text-xs mt-1"><span className="font-semibold">Benefits:</span> {meta.benefits}</div>
                  <div className="text-xs mt-1"><span className="font-semibold">Precautions:</span> {meta.precautions}</div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
