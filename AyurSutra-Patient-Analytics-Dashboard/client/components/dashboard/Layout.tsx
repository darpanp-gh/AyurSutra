import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  BookOpen,
  FileDown,
  Home,
  LineChart,
  Settings2,
  Stethoscope,
  Sun,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

function AyurSutraBrand() {
  const { state } = useSidebar();
  const [imgOk, setImgOk] = useState(true);
  const showText = state !== "collapsed";
  const collapsed = state === "collapsed";
  return (
    <div
      className={cn(
        "flex items-center gap-2 transition-all w-full",
        collapsed && "justify-center",
      )}
    >
      <div className="h-8 w-8 rounded-lg grid place-items-center overflow-hidden bg-primary/90 text-primary-foreground shadow-sm">
        {imgOk ? (
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F51a12b1e18d94572bdf0b6fa95ca1302%2F4eb1b5a4d694499b8287485d73907120?format=webp&width=800"
            alt="AyurSutra"
            className="h-8 w-8 object-cover"
            style={{ objectPosition: "left center" }}
            onError={() => setImgOk(false)}
          />
        ) : (
          <span className="font-bold text-sm">AS</span>
        )}
      </div>
      {showText && (
        <div className="transition-opacity duration-200">
          <div className="text-sm font-semibold leading-none">AyurSutra</div>
          <div className="text-xs text-muted-foreground">Panchakarma Care</div>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({
  rightPanel,
  children,
}: {
  rightPanel?: ReactNode;
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        className="border-r bg-[hsl(var(--sidebar-background))]/90 backdrop-blur supports-[backdrop-filter]:bg-sidebar/80"
      >
        <SidebarHeader className="px-3 py-4">
          <AyurSutraBrand />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive tooltip="Dashboard">
                  <a href="#" className="">
                    <Home /> <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Patients">
                  <a href="#">
                    <Stethoscope /> <span>Patients</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Therapies">
                  <a href="#">
                    <BookOpen /> <span>Therapies</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Daily Logs">
                  <a href="#">
                    <LineChart /> <span>Daily Logs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reports">
                  <a href="#">
                    <FileDown /> <span>Reports</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Lifestyle">
                  <a href="#">
                    <Sun /> <span>Lifestyle</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarSeparator />
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <a href="#">
                    <Settings2 /> <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-card/60 backdrop-blur px-3 md:px-6">
          <SidebarTrigger />
          <div className="flex-1">
            <h1 className="font-semibold tracking-tight text-lg md:text-xl">
              Patient Progress Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Purva • Pradhana • Paschat
            </p>
          </div>
          <Button size="sm" className="gap-2">
            <BadgeCheck className="h-4 w-4" /> Verify Session
          </Button>
        </header>
        <div
          className={cn(
            "grid gap-4 p-3 md:p-6",
            rightPanel ? "lg:grid-cols-[1fr_360px]" : "",
          )}
        >
          <div className="min-w-0">{children}</div>
          {rightPanel ? <aside className="min-w-0">{rightPanel}</aside> : null}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
