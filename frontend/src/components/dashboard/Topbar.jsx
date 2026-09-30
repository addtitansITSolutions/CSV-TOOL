import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Topbar = ({ onMenuClick, title }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={21} />
        </button>

        <h1 className="text-lg font-semibold text-slate-800">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-800">
            {user?.username || "User"}
          </p>
          <p className="text-xs text-slate-500">
            {user?.email || ""}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
          {(user?.username || user?.email || "U")
            .charAt(0)
            .toUpperCase()}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-red-600"
          title="Logout"
        >
          <LogOut size={17} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;