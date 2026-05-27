import {
  Home,
  Settings,
  Search,
  CalendarDays,
  LogOut,
  ChartColumn,
  X,
} from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const Sidebar = ({ setActivePage, activePage, isOpen, onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navStyle = (page) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
      activePage === page
        ? "bg-neutral-800 text-white"
        : "text-gray-400 hover:bg-neutral-800/50 hover:text-white"
    }`;

  const handleNav = (page) => {
    setActivePage(page);
    onClose?.();
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,16rem)] sm:w-64 flex-col justify-between border-r border-neutral-800 bg-neutral-950 p-4 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        <div className="mb-6 flex items-center justify-between gap-2">
          <div className="truncate font-bold text-white tracking-wide">
            {user.name}&apos;s Workspace
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-neutral-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-1 text-sm sm:text-base">
          <div className={navStyle("home")} onClick={() => handleNav("home")}>
            <Home size={16} /> Home
          </div>
          <div
            className={navStyle("diagram")}
            onClick={() => handleNav("diagram")}
          >
            <ChartColumn size={16} /> Diagram.io
          </div>

          <hr className="my-4 border-neutral-700" />

          <div
            className={navStyle("calendar")}
            onClick={() => handleNav("calendar")}
          >
            <CalendarDays size={16} /> Calendar
          </div>
          <div className={navStyle("tasks")} onClick={() => handleNav("tasks")}>
            📋 Weekly Tasks
          </div>
          <div
            className={navStyle("planner")}
            onClick={() => handleNav("planner")}
          >
            🗓️ Project Planner
          </div>
        </nav>
      </div>

      <div className="space-y-1 border-t border-neutral-800 pt-4 text-sm">
        <div className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-neutral-800/50 hover:text-white">
          <Settings size={16} /> Settings
        </div>
        <div
          className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-red-500/20 hover:text-red-400"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <LogOut size={16} /> Log Out
        </div>
      </div>
    </aside>
  );
};
