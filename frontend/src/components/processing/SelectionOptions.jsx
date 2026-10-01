import { Shuffle, ListOrdered } from "lucide-react";

const percentages = [
  { value: 10, interval: 10 },
  { value: 20, interval: 5 },
  { value: 25, interval: 4 },
  { value: 33, interval: 3 },
  { value: 50, interval: 2 },
  { value: 100, interval: 1 },
];

const methods = [
  {
    value: "random",
    label: "Random Selection",
    description: "Select rows randomly from the file.",
    icon: Shuffle,
  },
  {
    value: "interval",
    label: "Interval Selection",
    description: "Select rows at a fixed interval.",
    icon: ListOrdered,
  },
];

const SelectionOptions = ({ percentage, onPercentageChange, method, onMethodChange, disabled = false, }) => {
  const selectedOption = percentages.find( (item) => item.value === percentage );

  return (
    <div className="mt-4 space-y-6">
      {/* Percentage */}
      <section>
        {/* <div className="mb-3">
          <h2 className="text-base font-semibold text-slate-800">
            Select percentage
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose how much of your data you want to select.
          </p>
        </div> */}

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {percentages.map((item) => (
            <button
              key={item.value}
              type="button"
              disabled={disabled}
              onClick={() => onPercentageChange(item.value)}
              className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${
                percentage === item.value
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600"
                  : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-slate-50"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <span>{item.value}%</span>

              {method === "interval" && (
                <span className="mt-1 block text-xs font-normal">
                  {item.interval === 1
                    ? "Every row"
                    : `Every ${item.interval}${item.interval === 2 ? "nd" : item.interval === 3 ? "rd" : "th"} row`}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Method */}
      <section>
        <div className="mb-3">
          <h2 className="text-base font-semibold text-slate-800">
            Selection method
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose how the rows should be selected.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {methods.map((item) => {
            const Icon = item.icon;
            const isSelected = method === item.value;

            return (
              <button
                key={item.value}
                type="button"
                disabled={disabled}
                onClick={() => onMethodChange(item.value)}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600"
                    : "border-slate-200 bg-white hover:border-emerald-300"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <div
                  className={`rounded-lg p-2 ${
                    isSelected
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icon size={21} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>

                <span
                  className={`mt-1 h-4 w-4 rounded-full border ${
                    isSelected
                      ? "border-4 border-emerald-600"
                      : "border border-slate-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* Interval explanation */}
      {method === "interval" && selectedOption && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <p className="text-sm font-medium text-emerald-800">
            {selectedOption.interval === 1
              ? "Every data row will be selected."
              : `Every ${selectedOption.interval}${selectedOption.interval === 2 ? "nd" : selectedOption.interval === 3 ? "rd" : "th"} data row will be selected.`}
          </p>
          <p className="mt-1 text-xs text-emerald-700">
            The header row is excluded. Selection starts from the first
            data row and follows the chosen interval.
          </p>
        </div>
      )}
    </div>
  );
};

export default SelectionOptions;