import { useCallback, useEffect, useState } from "react";
import {
  History as HistoryIcon,
  RefreshCw,
  Trash2,
  FileSpreadsheet,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "../services/api";

const History = () => {
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchHistory = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/history", {
        params: {
          page,
          limit: 10,
        },
      });

      setHistory(response.data.history || []);
      setPagination(
        response.data.pagination || {
          currentPage: page,
          totalPages: 1,
          totalRecords: 0,
        }
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load processing history."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory(1);
  }, [fetchHistory]);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this processing record and its output files?"
    );

    if (!confirmed) return;

    setDeletingId(jobId);
    setError("");

    try {
      await api.delete(`/history/${jobId}`);
      await fetchHistory(
        history.length === 1 && pagination.currentPage > 1
          ? pagination.currentPage - 1
          : pagination.currentPage
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete this record. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const formatMethod = (method) => {
    if (!method) return "—";

    return method.charAt(0).toUpperCase() + method.slice(1);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
            <HistoryIcon size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Processing History
            </h1>
            <p className="text-sm text-gray-500">
              View and manage your previous processing jobs.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => fetchHistory(pagination.currentPage)}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* History Card */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">
              Previous Jobs
            </h2>
            <p className="text-sm text-gray-500">
              {pagination.totalRecords} total records
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 p-12 text-sm text-gray-500">
            <RefreshCw size={18} className="animate-spin" />
            Loading history...
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-3 rounded-full bg-gray-100 p-4 text-gray-400">
              <FileSpreadsheet size={28} />
            </div>
            <h3 className="font-semibold text-gray-900">
              No processing history yet
            </h3>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Once you process a file, your previous jobs will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">File</th>
                    <th className="px-5 py-3 font-medium">Percentage</th>
                    <th className="px-5 py-3 font-medium">Method</th>
                    <th className="px-5 py-3 font-medium">Date</th>
                    <th className="px-5 py-3 text-right font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {history.map((item) => (
                    <tr key={item._id || item.jobId} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-green-50 p-2 text-green-600">
                            <FileSpreadsheet size={18} />
                          </div>
                          <span className="max-w-xs truncate font-medium text-gray-800">
                            {item.originalFileName || item.fileName || "Untitled file"}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {item.percentage != null
                          ? `${item.percentage}%`
                          : "—"}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {formatMethod(item.method)}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item.jobId || item._id)
                          }
                          disabled={deletingId === (item.jobId || item._id)}
                          title="Delete record"
                          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-gray-100 md:hidden">
              {history.map((item) => {
                const id = item.jobId || item._id;

                return (
                  <div key={id} className="space-y-3 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg bg-green-50 p-2 text-green-600">
                        <FileSpreadsheet size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words font-medium text-gray-900">
                          {item.originalFileName || item.fileName || "Untitled file"}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDelete(id)}
                        disabled={deletingId === id}
                        aria-label="Delete record"
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                        {item.percentage != null
                          ? `${item.percentage}%`
                          : "—"}
                      </span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                        {formatMethod(item.method)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Page {pagination.currentPage || 1} of{" "}
                {pagination.totalPages || 1}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    fetchHistory(pagination.currentPage - 1)
                  }
                  disabled={
                    loading || pagination.currentPage <= 1
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() =>
                    fetchHistory(pagination.currentPage + 1)
                  }
                  disabled={
                    loading ||
                    pagination.currentPage >= pagination.totalPages
                  }
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default History;
