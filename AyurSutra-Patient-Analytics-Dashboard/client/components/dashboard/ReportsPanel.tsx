import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, FileDown, Printer, StretchVertical } from "lucide-react";
import { DailyLogItem, PatientProfile } from "@/lib/therapyData";
import { toCSV, printSection } from "@/lib/report";

function DietItem({ name, note, emoji }: { name: string; note: string; emoji: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border p-3 bg-secondary/40">
      <div className="h-9 w-9 rounded-md grid place-items-center text-xl bg-secondary">{emoji}</div>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-muted-foreground">{note}</div>
      </div>
    </div>
  );
}

function YogaItem({ title, emoji }: { title: string; emoji: string }) {
  return (
    <div className="rounded-lg border p-3 flex items-center gap-3">
      <div className="h-8 w-8 rounded-md grid place-items-center text-lg bg-accent/60">{emoji}</div>
      <div className="text-sm">{title}</div>
    </div>
  );
}

export default function ReportsPanel({ patient, logs }: { patient: PatientProfile; logs: DailyLogItem[] }) {
  const csvRows = logs.map((l) => ({
    Day: l.day,
    Date: new Date(l.date).toLocaleDateString(),
    Sleep: l.metrics.sleepQuality,
    Digestion: l.metrics.digestion,
    Stress: l.metrics.stress,
    Mood: l.mood,
  }));

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Reports</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button size="sm" className="gap-2" onClick={() => toCSV(csvRows)}><FileDown className="h-4 w-4"/> CSV</Button>
          <Button size="sm" variant="outline" className="gap-2" onClick={() => printSection("print-report")}> <Printer className="h-4 w-4"/> PDF</Button>
        </CardContent>
      </Card>

      <Card id="print-report">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Personalized Diet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <DietItem name="Warm Khichdi" note="Easy to digest; balances Vata & Pitta" emoji="🥣"/>
          <DietItem name="Herbal Tea (Tulsi/Ginger)" note="Supports digestion; reduces stress" emoji="🍵"/>
          <DietItem name="Ghee with rice" note="Nourishing; supports gut lining" emoji="🧈"/>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Lifestyle & Yoga</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <YogaItem title="Morning Pranayama (10 mins)" emoji="🧘"/>
          <YogaItem title="Evening Walk (20 mins)" emoji="🚶"/>
          <YogaItem title="Abhyanga (Warm oil massage)" emoji="💆"/>
        </CardContent>
      </Card>
    </div>
  );
}
