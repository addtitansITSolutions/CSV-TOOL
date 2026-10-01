import { Download, FileSpreadsheet, FileText } from "lucide-react";
import api from "../../services/api";

const DownloadResults = ({ jobId }) => {
  const downloadFile = async (type, filename) => {
    try {
      const response = await api.get(
        `/download/${jobId}/${type}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Unable to download the file. Please try again.");
    }
  };

  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Processing completed
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Your files are ready to download.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() =>
            downloadFile("marked", "marked-data.xlsx")
          }
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-orange-400 hover:text-orange-600"
        >
          <FileSpreadsheet size={18} />
          <span>Download Marked Excel</span>
          <Download size={16} />
        </button>

        <button
          type="button"
          onClick={() =>
            downloadFile("selected", "selected-rows.csv")
          }
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-orange-400 hover:text-orange-600"
        >
          <FileText size={18} />
          <span>Download Selected CSV</span>
          <Download size={16} />
        </button>
      </div>
    </div>
  );
};

export default DownloadResults;
