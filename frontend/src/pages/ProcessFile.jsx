import { useState } from "react";
import { FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";

import FileUpload from "../components/processing/FileUpload";
import SelectionOptions from "../components/processing/SelectionOptions";
import ProcessingButton from "../components/processing/ProcessingButton";
import DownloadResults from "../components/processing/DownloadResults";

import { processFile } from "../services/processingService";

const ProcessFile = () => {
  const [file, setFile] = useState(null);
  const [percentage, setPercentage] = useState(25);
  const [method, setMethod] = useState("random");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setError("");
    setResult(null);
  };

  const handleProcess = async () => {
    if (!file) {
      setError("Please select a CSV or XLSX file first.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await processFile({
        file,
        percentage,
        method,
      });

      setResult(response);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong while processing the file. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-full space-y-6">
      {/* Page Header */}
      <div>
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
            <FileSpreadsheet size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Process CSV
            </h1>
            <p className="text-sm text-gray-500">
              Upload a file and choose how you want to select rows.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            1. Upload your file
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Select a CSV or XLSX file to get started.
          </p>
        </div>

        <FileUpload
          file={file}
          onFileChange={handleFileChange}
          disabled={loading}
        />
      </section>

      {/* Selection Options */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            2. Choose selection options
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose the percentage of rows and the selection method.
          </p>
        </div>

        <SelectionOptions
          percentage={percentage}
          onPercentageChange={setPercentage}
          method={method}
          onMethodChange={setMethod}
          disabled={loading}
        />
      </section>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Process Button */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            3. Process your file
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your original file will remain unchanged.
          </p>
        </div>

        <ProcessingButton
          onClick={handleProcess}
          loading={loading}
          disabled={!file}
        />
      </section>

      {/* Processing Result */}
      {result?.jobId && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
            <CheckCircle2 size={20} className="shrink-0" />
            <div>
              <p className="font-semibold">File processed successfully!</p>
              <p className="text-sm">
                Your output files are ready.
              </p>
            </div>
          </div>

          <DownloadResults jobId={result.jobId} />
        </section>
      )}
    </div>
  );
};

export default ProcessFile;
