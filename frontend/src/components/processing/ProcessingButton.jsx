import { LoaderCircle, Play } from "lucide-react";

const ProcessingButton = ({ onClick, loading = false, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <LoaderCircle size={18} className="animate-spin" />
          Processing file...
        </>
      ) : (
        <>
          <Play size={18} fill="currentColor" />
          Process File
        </>
      )}
    </button>
  );
};

export default ProcessingButton;
