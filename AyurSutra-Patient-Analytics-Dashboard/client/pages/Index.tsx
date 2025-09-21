import DashboardLayout from "@/components/dashboard/Layout";
import PatientProfileCard from "@/components/dashboard/PatientProfileCard";
import TherapyProgress from "@/components/dashboard/TherapyProgress";
import DailyProgress from "@/components/dashboard/DailyProgress";
import MetricsCharts from "@/components/dashboard/MetricsCharts";
import ReportsPanel from "@/components/dashboard/ReportsPanel";
import { mockDashboard } from "@/lib/therapyData";

export default function Index() {
  const data = mockDashboard;

  return (
    <DashboardLayout
      rightPanel={<ReportsPanel patient={data.patient} logs={data.logs} />}
    >
      <div className="grid gap-4">
        <PatientProfileCard patient={data.patient} />
        <TherapyProgress progress={data.progress} />
        <MetricsCharts logs={data.logs} />
        <DailyProgress logs={data.logs} />
      </div>
    </DashboardLayout>
  );
}
