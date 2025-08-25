import { Home, Settings, Search, CalendarDays, LogOut, ChartColumn } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ setActivePage, activePage }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const navStyle = (page) =>
    `flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${
      activePage === page ? 'bg-neutral-800 text-white' : 'text-gray-400 hover:text-white'
    }`;

  return (
    <div className="w-64 p-4 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="bold text-white tracking-wide">
            {user.name}’s Workspace
          </div>
          <button className="text-gray-400">✏️</button>
        </div>

        <nav className="space-y-4 text-md">
          <div className={navStyle('home')} onClick={() => setActivePage('home')}>
            <Home size={16} /> Home
          </div>
          <div className={navStyle('diagram')} onClick={() => setActivePage('diagram')}>
            <ChartColumn size={16} /> Diagram.io
          </div>
          <div className={navStyle('search')} onClick={() => setActivePage('search')}>
            <Search size={16} /> Search
          </div>

          <hr className="my-4 border-neutral-700" />

          <div className={navStyle('calendar')} onClick={() => setActivePage('calendar')}>
            <CalendarDays size={16} /> Calendar
          </div>
          <div className={navStyle('tasks')} onClick={() => setActivePage('tasks')}>
            📋 Weekly Tasks
          </div>
          <div className={navStyle('habit')} onClick={() => setActivePage('habit')}>
            ✅ Habit Tracker
          </div>
          <div className={navStyle('planner')} onClick={() => setActivePage('planner')}>
            🗓️ Project Planner
          </div>
        </nav>
      </div>

      {/* TODO CLEAN TEAM AND TEAM CHAT THING */}

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 cursor-pointer mb-4">
          <Settings size={16} /> Settings
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-red-500 hover:transition-all hover:p-2 hover:rounded"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          <LogOut size={16} /> Log Out
        </div>
      </div>
    </div>
  );
};
