import { useEffect, useState } from "react";
import {
  FileSpreadsheet,
  CheckCircle,
  Database,
  Upload,
  History,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getDashboardData } from "../services/dashboardService";

import StatCard from "../components/dashboard/StatCard";
import QuickAction from "../components/dashboard/QuickAction";
import RecentActivity from "../components/dashboard/RecentActivity";

const Dashboard = () => {
  const { user } = useAuth();

  const [history, setHistory] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isAdmin = user?.role === "admin";

  const fetchDashboardData = async () => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await getDashboardData();

      setHistory(data.history || []);
      setTotalJobs(data.pagination?.totalRecords || 0);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [isAdmin]);

  const completedJobs = history.filter( (job) => job.status === "completed" ).length;

  const rowsInRecentJobs = history.reduce(
    (total, job) => total + (job.totalRows || 0),
    0
  );

  const displayName = user?.username || "there";

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Welcome */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-emerald-600">
            Workspace overview
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Welcome back, {displayName}!
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's what's happening in your CSV workspace.
          </p>
        </div>

        <Link
          to="/process"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Upload size={18} />
          Process a file
        </Link>
      </section>

      {/* Statistics */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-800">
            Your activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            A summary of your processing workspace.
          </p>
        </div>

        {!isAdmin ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Processing statistics are available to administrators only.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Total jobs"
              value={loading ? "..." : error ? "—" : totalJobs}
              description="All jobs in processing history"
              icon={FileSpreadsheet}
            />

            <StatCard
              title="Completed jobs"
              value={loading ? "..." : error ? "—" : completedJobs}
              description="Among the latest 5 jobs"
              icon={CheckCircle}
            />

            <StatCard
              title="Rows in recent jobs"
              value={loading ? "..." : error ? "—" : rowsInRecentJobs.toLocaleString()}
              description="Across the latest 5 jobs"
              icon={Database}
            />
          </div>
        )}
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-semibold text-slate-800">
            Quick actions
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Jump straight to what you need.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <QuickAction
            title="Process a CSV file"
            description="Upload a file and select rows using random or interval selection."
            icon={FileSpreadsheet}
            to="/process"
          />

          <QuickAction
            title="View processing history"
            description="Review previous jobs and manage their generated files."
            icon={History}
            to="/history"
          />
        </div>
      </section>

      {/* Recent activity */}
      {isAdmin && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800">
              Recent activity
            </h2>

            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading && history.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
              Loading recent activity...
            </div>
          ) : (
            <RecentActivity jobs={history} />
          )}
        </section>
      )}
    </div>
  );
};

export default Dashboard;