import { useContext, useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "../components/dashboardComponents/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { DashboardHome } from "../components/dashboardComponents/DashboardHome";
import { WeeklyPlanner } from "../components/dashboardComponents/WeeklyPlanner";
import { WeeklyTasks } from "../components/dashboardComponents/WeeklyTasks";
import DiagramEditor from "../components/dashboardComponents/DiagramEditor";
import CalendarBoard from "../components/dashboardComponents/CalendarBoard";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activePage, setActivePage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-neutral-900 px-4 text-center text-gray-400">
        Loading user data...
      </div>
    );
  }

  const handlePageChange = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <DashboardHome />;
      case "diagram":
        return <DiagramEditor />;
      case "tasks":
        return <WeeklyTasks />;
      case "planner":
        return <WeeklyPlanner />;
      case "calendar":
        return <CalendarBoard />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="flex min-h-[100dvh] bg-neutral-900 text-white">
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden={!sidebarOpen}
      />

      <Sidebar
        setActivePage={handlePageChange}
        activePage={activePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex shrink-0 items-center gap-3 border-b border-neutral-800 bg-neutral-900 px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-neutral-800 hover:text-white"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <span className="truncate text-sm font-medium tracking-wide">
            {user.name}&apos;s Workspace
          </span>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-5 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
