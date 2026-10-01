import { useRef, useState } from "react";
import { UploadCloud, FileSpreadsheet, X, AlertCircle } from "lucide-react";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB
const ALLOWED_EXTENSIONS = [".csv", ".xlsx"];

const FileUpload = ({ file, onFileChange, disabled = false }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    const fileName = selectedFile.name.toLowerCase();
    const isAllowed = ALLOWED_EXTENSIONS.some((extension) => fileName.endsWith(extension) );

    if (!isAllowed) {
      setError("Please select a CSV or XLSX file.");
      return false;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be 20 MB or less.");
      return false;
    }
    if (selectedFile.size === 0) {
      setError("The selected file is empty.");
      return false;
    }
    setError("");
    onFileChange(selectedFile);
    return true;
  };

  const handleInputChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      validateFile(selectedFile);
    }

    // Allows selecting the same file again after clearing it.
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    if (disabled) return;

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      validateFile(droppedFile);
    }
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-3">
      {/* <div>
        <h2 className="text-base font-semibold text-slate-800">
          Upload your file
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Select a CSV or XLSX file to get started.
        </p>
      </div> */}

      {!file ? (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`flex min-h-56 flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition ${
            dragging
              ? "border-emerald-500 bg-emerald-50"
              : "border-slate-300 bg-white hover:border-emerald-400"
          } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
        >
          <div className="mb-4 rounded-full bg-emerald-50 p-4 text-emerald-600">
            <UploadCloud size={30} />
          </div>

          <p className="text-sm font-semibold text-slate-700">
            Drag and drop your file here
          </p>

          <p className="mt-1 text-sm text-slate-500">
            or
          </p>

          <button
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
            className="mt-3 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Browse files
          </button>

          <p className="mt-4 text-xs text-slate-400">
            CSV or XLSX · Maximum 20 MB
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx"
            onChange={handleInputChange}
            disabled={disabled}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700">
            <FileSpreadsheet size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {file?.name}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {formatFileSize(file?.size)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleRemoveFile}
            disabled={disabled}
            aria-label="Remove selected file"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <AlertCircle size={17} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;