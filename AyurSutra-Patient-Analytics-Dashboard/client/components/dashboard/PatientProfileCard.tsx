import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PatientProfile, TherapyAssignment } from "@/lib/therapyData";

function DoshaBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">{label}</span><span className="font-medium">{value}%</span></div>
      <div className="h-2 rounded-full bg-muted">
        <div className="h-2 rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function TherapyPill({ t }: { t: TherapyAssignment }) {
  return (
    <div className="px-2 py-1 rounded-full text-xs bg-accent text-accent-foreground border inline-flex items-center gap-2">
      <span className="font-medium">{t.name}</span>
      <span className="opacity-70">{new Date(t.startDate).toLocaleDateString()} – {new Date(t.endDate).toLocaleDateString()}</span>
    </div>
  );
}

export default function PatientProfileCard({ patient }: { patient: PatientProfile }) {
  return (
    <Card className="card-gradient overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary/30">
            <AvatarImage src={patient.photoUrl} alt={patient.name} />
            <AvatarFallback>{patient.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{patient.name}</CardTitle>
            <div className="text-sm text-muted-foreground">{patient.age} • {patient.gender} • {patient.contact}</div>
            <div className="mt-1 text-sm"><span className="text-muted-foreground">Condition:</span> {patient.condition}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="text-sm font-semibold">Dosha Imbalance</div>
          <DoshaBar label="Vata" value={patient.doshaImbalance.Vata} color="hsl(210 80% 45%)" />
          <DoshaBar label="Pitta" value={patient.doshaImbalance.Pitta} color="hsl(18 90% 50%)" />
          <DoshaBar label="Kapha" value={patient.doshaImbalance.Kapha} color="hsl(140 45% 35%)" />
        </div>
        <div className="space-y-3">
          <div className="text-sm font-semibold">Assigned Therapies</div>
          <div className="flex flex-wrap gap-2">
            {patient.assignedTherapies.map((t) => (
              <TherapyPill key={`${t.name}-${t.startDate}`} t={t} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
