import { useContext, useState } from "react";
import { Sidebar } from "../components/dashboardComponents/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { DashboardHome } from "../components/dashboardComponents/DashboardHome"
import { WeeklyPlanner } from "../components/dashboardComponents/WeeklyPlanner";
import { WeeklyTasks } from "../components/dashboardComponents/WeeklyTasks";
import DiagramEditor from "../components/dashboardComponents/DiagramEditor";
import CalendarBoard from "../components/dashboardComponents/CalendarBoard";


export const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activePage, setActivePage] = useState("home");

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading user data...
      </div>
    );
  }

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <DashboardHome />;
      case "diagram":
        return <DiagramEditor />;
      case "tasks":
        return <WeeklyTasks />
      case "planner":
        return <WeeklyPlanner />
      case "calendar":
        return <CalendarBoard />
      default:
        return <DashboardHome />;
    }
  }

  return (
    <div className="flex min-h-screen bg-neutral-900 text-white">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}
