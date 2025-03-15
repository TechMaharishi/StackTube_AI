import { createBrowserRouter } from "react-router-dom";
import { AppSidebar } from "@/pages/appsidebar";
import { lazy, Suspense } from "react";
import { Loading } from "@/components/ui/loading";

const SoftwareEngineer = lazy(() => import("./pages/software-engineer"));
const WebDeveloper = lazy(() => import("./pages/web-developer"));
const MobileDeveloper = lazy(() => import("./pages/mobile-developer"));
const CyberSecuritySpecialist = lazy(() => import("./pages/cyber-security-specialist"));
const AIEngineer = lazy(() => import("./pages/ai-engineer"));
const DataScientist = lazy(() => import("./pages/data-scientist"));
const CloudEngineer = lazy(() => import("./pages/cloud-engineer"));
const DevOpsEngineer = lazy(() => import("./pages/devops-engineer"));
const GameDeveloper = lazy(() => import("./pages/game-developer"));
const NetworkEngineer = lazy(() => import("./pages/network-engineer"));
const Video = lazy(() => import("./pages/video"));


const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppSidebar />,
    children: [
      {
        path: "software_engineer",
        element: withSuspense(SoftwareEngineer),
      },
      {
        path: "web_developer",
        element: withSuspense(WebDeveloper),
      },
      {
        path: "mobile_developer",
        element: withSuspense(MobileDeveloper),
      },
      {
        path: "cyber_security_specialist",
        element: withSuspense(CyberSecuritySpecialist),
      },
      {
        path: "ai_engineer",
        element: withSuspense(AIEngineer),
      },
      {
        path: "data_scientist",
        element: withSuspense(DataScientist),
      },
      {
        path: "cloud_engineer",
        element: withSuspense(CloudEngineer),
      },
      {
        path: "devops_engineer",
        element: withSuspense(DevOpsEngineer),
      },
      {
        path: "game_developer",
        element: withSuspense(GameDeveloper),
      },
      {
        path: "network_engineer",
        element: withSuspense(NetworkEngineer),
      },
      {
        path: "/watch/:videoId",
        element: withSuspense(Video)
      }
    ],
  },
]);

