import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DailyLogItem } from "@/lib/therapyData";

export default function MetricsCharts({ logs }: { logs: DailyLogItem[] }) {
  const data = logs.map((l) => ({
    day: `D${l.day}`,
    Sleep: l.metrics.sleepQuality,
    Digestion: l.metrics.digestion,
    Stress: l.metrics.stress,
  }));
  const config = {
    Sleep: { label: "Sleep Quality", color: "hsl(210 80% 50%)" },
    Digestion: { label: "Digestion", color: "hsl(142 45% 35%)" },
    Stress: { label: "Stress (lower is better)", color: "hsl(18 90% 50%)" },
  };
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Body Response Metrics</CardTitle>
        <div className="text-sm text-muted-foreground">Trends across sleep, digestion and stress</div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-72 w-full">
          <AreaChart data={data} margin={{ left: 8, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} domain={[0, 100]} />
            <Area type="monotone" dataKey="Sleep" fill="var(--color-Sleep)" stroke="var(--color-Sleep)" fillOpacity={0.15} />
            <Area type="monotone" dataKey="Digestion" fill="var(--color-Digestion)" stroke="var(--color-Digestion)" fillOpacity={0.15} />
            <Area type="monotone" dataKey="Stress" fill="var(--color-Stress)" stroke="var(--color-Stress)" fillOpacity={0.15} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
