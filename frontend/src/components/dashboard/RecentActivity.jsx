import { FileSpreadsheet, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

const RecentActivity = ({ jobs = [] }) => {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-800">
            Recent activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your latest processing jobs
          </p>
        </div>

        <Link
          to="/history"
          className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          View history
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center px-5 py-12 text-center">
          <div className="rounded-full bg-slate-100 p-4 text-slate-400">
            <FileSpreadsheet size={28} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-700">
            No recent activity
          </h3>

          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Once you process a file, your recent jobs will appear here.
          </p>

          <Link
            to="/process"
            className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Process your first file
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {jobs.map((job) => (
            <div
              key={job.jobId}
              className="flex items-center gap-3 px-5 py-4"
            >
              <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-600">
                <FileSpreadsheet size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">
                  {job.originalFileName}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <Clock3 size={13} />
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleString()
                    : "Date unavailable"}
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium capitalize text-emerald-700">
                {job.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentActivity;