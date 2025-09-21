export type Dosha = "Vata" | "Pitta" | "Kapha";

export type TherapyStepKey =
  | "purva"
  | "pradhana"
  | "paschat";

export type PanchakarmaProcedure =
  | "Vamana"
  | "Virechana"
  | "Basti"
  | "Nasya"
  | "Raktamokshana";

export interface TherapyAssignment {
  name: PanchakarmaProcedure;
  startDate: string; // ISO date
  endDate: string; // ISO date
  notes?: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male" | "Other";
  contact: string;
  photoUrl?: string;
  condition: string;
  doshaImbalance: Record<Dosha, number>; // percent 0-100
  assignedTherapies: TherapyAssignment[];
}

export interface DailyLogItem {
  day: number;
  date: string;
  symptoms: string[];
  emotionalStatus: string;
  physicalStatus: string;
  doctorNotes?: string;
  mood: 1 | 2 | 3 | 4 | 5; // 1 sad -> 5 very happy
  metrics: {
    sleepQuality: number; // 0-100
    digestion: number; // 0-100
    stress: number; // 0-100 (lower better)
  };
}

export interface TherapyProgress {
  stageCompletion: Record<TherapyStepKey, number>; // 0-100
  procedures: Record<PanchakarmaProcedure, { completed: boolean; purpose: string; benefits: string; precautions: string }>;
}

export interface DashboardData {
  patient: PatientProfile;
  progress: TherapyProgress;
  logs: DailyLogItem[];
}

export const mockDashboard: DashboardData = {
  patient: {
    id: "pt-1001",
    name: "Ananya Sharma",
    age: 32,
    gender: "Female",
    contact: "+91 98765 43210",
    photoUrl: "/placeholder.svg",
    condition: "Chronic stress with digestive irregularities",
    doshaImbalance: { Vata: 30, Pitta: 50, Kapha: 20 },
    assignedTherapies: [
      { name: "Vamana", startDate: "2025-09-10", endDate: "2025-09-12" },
      { name: "Virechana", startDate: "2025-09-15", endDate: "2025-09-18" },
      { name: "Basti", startDate: "2025-09-20", endDate: "2025-09-26" },
      { name: "Nasya", startDate: "2025-09-27", endDate: "2025-09-28" },
      { name: "Raktamokshana", startDate: "2025-09-30", endDate: "2025-10-01" },
    ],
  },
  progress: {
    stageCompletion: { purva: 100, pradhana: 65, paschat: 20 },
    procedures: {
      Vamana: {
        completed: true,
        purpose: "Therapeutic emesis to expel excess Kapha and toxins",
        benefits: "Relief in asthma, cold, skin disorders; enhances metabolism",
        precautions: "Light diet before/after, avoid exertion for 24-48 hours",
      },
      Virechana: {
        completed: true,
        purpose: "Purgation therapy to eliminate Pitta and toxins",
        benefits: "Improves digestion, skin health, liver function",
        precautions: "Hydration, monitored diet, rest post-procedure",
      },
      Basti: {
        completed: false,
        purpose: "Medicated enema for Vata balancing and detox",
        benefits: "Relieves constipation, joint pain; improves sleep",
        precautions: "Warm environment, gentle foods, avoid cold exposure",
      },
      Nasya: {
        completed: false,
        purpose: "Nasal administration to cleanse head region",
        benefits: "Relieves headaches, sinusitis; enhances focus",
        precautions: "Avoid dust, strong sun; rest after procedure",
      },
      Raktamokshana: {
        completed: false,
        purpose: "Bloodletting to reduce toxins and inflammation",
        benefits: "Useful in skin diseases, gout; reduces swelling",
        precautions: "Sterile technique, hydration, doctor supervision",
      },
    },
  },
  logs: Array.from({ length: 10 }).map((_, i) => {
    const day = i + 1;
    return {
      day,
      date: new Date(2025, 8, 20 + i).toISOString(),
      symptoms: day < 3 ? ["Headache", "Bloating"] : day < 6 ? ["Mild fatigue"] : ["Improved appetite"],
      emotionalStatus: day < 4 ? "Anxious" : day < 7 ? "Calm" : "Positive",
      physicalStatus: day < 4 ? "Sluggish" : day < 7 ? "Stable" : "Energized",
      doctorNotes: day % 3 === 0 ? "Increase warm fluids, continue light yoga." : undefined,
      mood: (Math.min(5, Math.max(1, (3 + Math.round(Math.sin(day) * 2))) ) as 1|2|3|4|5),
      metrics: {
        sleepQuality: Math.min(100, 50 + day * 4),
        digestion: Math.min(100, 40 + day * 5),
        stress: Math.max(10, 80 - day * 5),
      },
    } satisfies DailyLogItem;
  }),
};
