import { Link } from "react-router-dom";
import {
ArrowRight,
ArrowDownToLine,
FileSpreadsheet,
Shuffle,
ListChecks,
ShieldCheck,
CheckCircle2,
Upload,
SlidersHorizontal,
Menu,
X,
LogIn,
Settings2,
} from "lucide-react";
import { useState } from "react";

const features = [
{
icon: Shuffle,
title: "Random Selection",
description:
"Select a percentage of rows randomly, without duplicates, while preserving the original order.",
},
{
icon: ListChecks,
title: "Interval Selection",
description:
"Choose rows at a consistent interval, calculated automatically from your selected percentage.",
},
{
icon: ArrowDownToLine,
title: "Ready-to-use Exports",
description:
"Download a highlighted Excel file and a separate CSV containing only your selected rows.",
},
];

const steps = [
{
number: "01",
icon: Upload,
title: "Upload your file",
description: "Choose a CSV or XLSX file from your device.",
},
{
number: "02",
icon: SlidersHorizontal,
title: "Choose your selection",
description:
"Set a percentage and choose random or interval selection.",
},
{
number: "03",
icon: ArrowDownToLine,
title: "Download your results",
description:
"Get the highlighted Excel file and selected-row CSV.",
},
];

function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);

const closeMenu = () => setMenuOpen(false);

return ( <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl"> <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8"> <Link to="/" className="flex items-center gap-2.5" onClick={closeMenu}> <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white"> <FileSpreadsheet size={24} /> </span> <span className="text-xl font-bold tracking-tight text-slate-900">
CSV<span className="text-emerald-600">Tool</span> </span> </Link>

    <div className="hidden items-center gap-9 md:flex">
      <a
        href="#home"
        className="text-sm font-medium text-emerald-700 transition hover:text-emerald-600"
      >
        Home
      </a>
      <a
        href="#features"
        className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
      >
        Features
      </a>
      <a
        href="#how-it-works"
        className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
      >
        How It Works
      </a>
      <a
        href="#about"
        className="text-sm font-medium text-slate-600 transition hover:text-emerald-600"
      >
        About
      </a>
    </div>

    <Link
      to="/login"
      className="hidden items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 md:inline-flex"
    >
      <LogIn size={16} />
      Login
    </Link>

    <button
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
      className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
    >
      {menuOpen ? <X size={23} /> : <Menu size={23} />}
    </button>
  </nav>

  {menuOpen && (
    <div className="border-t border-slate-200 bg-white px-5 py-5 md:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-4">
        <a href="#home" onClick={closeMenu} className="text-sm font-medium text-slate-700">
          Home
        </a>
        <a href="#features" onClick={closeMenu} className="text-sm font-medium text-slate-700">
          Features
        </a>
        <a href="#how-it-works" onClick={closeMenu} className="text-sm font-medium text-slate-700">
          How It Works
        </a>
        <a href="#about" onClick={closeMenu} className="text-sm font-medium text-slate-700">
          About
        </a>
        <Link
          to="/login"
          onClick={closeMenu}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white"
        >
          <LogIn size={16} />
          Login
        </Link>
      </div>
    </div>
  )}
</header>


);
}

function SpreadsheetPreview() {
const rows = [
["Product A", "Electronics", "$450"],
["Product B", "Fashion", "$280"],
["Product C", "Home", "$320"],
["Product D", "Electronics", "$520"],
["Product E", "Sports", "$180"],
];

return ( <div className="relative mx-auto w-full max-w-xl"> <div className="absolute -inset-8 rounded-full bg-emerald-100/70 blur-3xl" />


  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 sm:px-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
          <FileSpreadsheet size={20} />
        </span>
        <div>
          <p className="text-sm font-bold text-slate-800">CSV Tool</p>
          <p className="text-[11px] text-slate-400">Processing workspace</p>
        </div>
      </div>
      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
        Preview
      </span>
    </div>

    <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[116px_1fr]">
      <aside className="border-r border-slate-100 bg-slate-50/70 p-2 sm:p-3">
        <div className="mb-4 flex items-center gap-1.5 px-1 text-[10px] font-semibold text-slate-500">
          <FileSpreadsheet size={13} className="text-emerald-600" />
          Workspace
        </div>
        <div className="space-y-1 text-[10px] font-medium">
          <div className="flex items-center gap-2 rounded-md px-2 py-2 text-slate-500">
            <Settings2 size={13} /> Dashboard
          </div>
          <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-2 py-2 text-emerald-700">
            <FileSpreadsheet size={13} /> Process File
          </div>
          <div className="flex items-center gap-2 rounded-md px-2 py-2 text-slate-500">
            <ListChecks size={13} /> History
          </div>
        </div>
      </aside>

      <div className="min-w-0 p-3 sm:p-5">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 p-2.5">
          <FileSpreadsheet size={20} className="shrink-0 text-emerald-600" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-slate-700">
              sales_data.xlsx
            </p>
            <p className="text-[10px] text-slate-400">Excel spreadsheet</p>
          </div>
          <CheckCircle2 size={16} className="text-emerald-600" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4">
          <div>
            <p className="mb-2 text-[10px] font-semibold text-slate-500">
              Select rows
            </p>
            <div className="space-y-2 text-[10px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border-[3px] border-emerald-600" />
                Random selection
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full border border-slate-300" />
                Interval selection
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-semibold text-slate-500">
              Percentage
            </p>
            <div className="flex items-center justify-between rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700">
              25%
              <span className="text-slate-400">▼</span>
            </div>
            <div className="mt-2 rounded-md bg-emerald-600 px-2 py-1.5 text-center text-[10px] font-semibold text-white">
              Process File
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          <div className="grid grid-cols-3 bg-slate-50 text-[9px] font-semibold text-slate-500 sm:text-[10px]">
            {["Product", "Category", "Sales"].map((item) => (
              <div key={item} className="truncate px-2 py-2 sm:px-3">
                {item}
              </div>
            ))}
          </div>
          {rows.map((row, index) => (
            <div
              key={row[0]}
              className={`grid grid-cols-3 border-t border-slate-100 text-[9px] sm:text-[10px] ${
                index === 1 || index === 3
                  ? "bg-red-50 text-red-800"
                  : "bg-white text-slate-600"
              }`}
            >
              {row.map((cell) => (
                <div key={cell} className="truncate px-2 py-2 sm:px-3">
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
          <ShieldCheck size={15} className="shrink-0 text-emerald-600" />
          <p className="text-[9px] font-medium text-slate-600 sm:text-[10px]">
            Selected rows highlighted in Excel
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className="absolute -bottom-5 -left-3 hidden items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:flex">
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
      <ArrowDownToLine size={19} />
    </span>
    <div>
      <p className="text-xs font-bold text-slate-800">Files ready</p>
      <p className="text-[10px] text-slate-500">Excel + CSV</p>
    </div>
  </div>
</div>

);
}

function Home() {
return ( <div className="min-h-screen bg-white text-slate-900"> <Navbar />
  <main>
    {/* Hero */}
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-white to-white">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-emerald-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-700">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Smart CSV Processing
          </div>

          <h1 className="max-w-xl text-4xl leading-[1.15] font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Process your CSV files{" "}
            <span className="text-emerald-600">with ease.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
            Select rows, highlight data, and export your results in just a
            few clicks. Save time and work smarter with our simple and
            powerful CSV tool.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <LogIn size={17} />
              Get Started
              <ArrowRight size={17} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50"
            >
              <CheckCircle2 size={17} className="text-emerald-600" />
              Learn More
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-600">
            {["No installation required", "Secure & private processing", "CSV and Excel support"].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-600" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        <SpreadsheetPreview />
      </div>
    </section>

    {/* Features */}
    <section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">
            Built for your workflow
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Our Features
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Everything you need to select, review, and export your
            spreadsheet data without complicated steps.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/20 p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Icon size={23} />
                </div>
                <h3 className="mt-6 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* How it works */}
    <section id="how-it-works" className="bg-emerald-50/50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.5fr] lg:items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase">
              Simple steps
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              Get your selected data in three easy steps. It's fast,
              simple, and hassle-free.
            </p>
            <Link
              to="/login"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Get Started <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative rounded-2xl border border-emerald-100 bg-white p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                      {step.number}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      <Icon size={20} />
                    </span>
                  </div>
                  <h3 className="mt-5 text-sm font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div id="about" className="mt-14 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-slate-950 p-7 text-white sm:flex-row sm:items-center sm:p-9">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <ShieldCheck size={25} />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-[0.16em] text-emerald-400 uppercase">
                Ready to get started?
              </p>
              <h2 className="mt-1 text-lg font-semibold sm:text-xl">
                Make your spreadsheet workflow simpler.
              </h2>
              <p className="mt-1 text-xs text-slate-300">
                Sign in to access your CSV processing workspace.
              </p>
            </div>
          </div>

          <Link
            to="/login"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Login to CSV Tool <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  </main>

  {/* Footer */}
  <footer className="border-t border-slate-200 bg-white">
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <Link to="/" className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white">
          <FileSpreadsheet size={19} />
        </span>
        <span className="text-base font-bold text-slate-900">
          CSV<span className="text-emerald-600">Tool</span>
        </span>
      </Link>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
        <a href="#home" className="transition hover:text-emerald-600">Home</a>
        <a href="#features" className="transition hover:text-emerald-600">Features</a>
        <a href="#how-it-works" className="transition hover:text-emerald-600">How It Works</a>
        <Link to="/login" className="transition hover:text-emerald-600">Login</Link>
      </div>

      <p className="text-xs text-slate-400">
        © {new Date().getFullYear()} CSV Tool. All rights reserved.
      </p>
    </div>
  </footer>
</div>


);
}

export default Home;
