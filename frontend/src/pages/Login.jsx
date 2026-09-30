import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
ArrowLeft,
ArrowRight,
Eye,
EyeOff,
FileSpreadsheet,
LockKeyhole,
Mail,
ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
const navigate = useNavigate();
const { login, isAuthenticated, loading } = useAuth();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState("");

// Already logged-in users should not see the login page
if (!loading && isAuthenticated) {
return <Navigate to="/dashboard" replace />;
}

const handleSubmit = async (e) => {
e.preventDefault();
setError("");
setSubmitting(true);


try {
  await login({ email: email.trim(), password });
  navigate("/dashboard", { replace: true });
} catch (err) {
  setError(
    err.response?.data?.message ||
      "Unable to sign in. Please check your credentials and try again."
  );
} finally {
  setSubmitting(false);
}

};

if (loading) {
return ( 
    <div className="flex min-h-screen items-center justify-center bg-slate-50"> 
    <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" /> </div>
);
}

return ( 
    <main className="flex min-h-screen bg-white">
    {/* Left branding panel */}
    <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-950 p-12 text-white lg:flex xl:p-16"> 
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" /> 
        <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-3xl" />

    <Link to="/" className="relative flex w-fit items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
        <FileSpreadsheet size={25} />
      </span>
      <span className="text-2xl font-bold tracking-tight">
        CSV<span className="text-emerald-400">Tool</span>
      </span>
    </Link>

    <div className="relative max-w-lg">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2 text-xs font-medium text-emerald-300">
        <ShieldCheck size={15} />
        Your spreadsheet workspace
      </div>

      <h1 className="text-4xl leading-tight font-bold tracking-tight xl:text-5xl">
        Your data workflow,
        <span className="mt-1 block text-emerald-400">
          made simpler.
        </span>
      </h1>

      <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
        Select, organize, and export spreadsheet data with a simple,
        focused workspace designed to save you time.
      </p>

      <div className="mt-10 space-y-4">
        {[
          "Random and interval row selection",
          "Highlighted Excel and selected CSV exports",
          "Access your processing history",
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <ShieldCheck size={14} />
            </span>
            <span className="text-sm text-slate-300">{item}</span>
          </div>
        ))}
      </div>
    </div>

    <p className="relative text-xs text-slate-500">
      A simpler way to work with spreadsheet data.
    </p>
  </section>

  {/* Login form */}
  <section className="flex flex-1 flex-col">
    <div className="flex items-center justify-between p-5 sm:p-8 lg:justify-end">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700 lg:hidden"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <Link
        to="/"
        className="hidden items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700 lg:inline-flex"
      >
        <ArrowLeft size={16} />
        Back to website
      </Link>
    </div>

    <div className="flex flex-1 items-center justify-center px-5 pb-12 sm:px-10">
      <div className="w-full max-w-md">
        <div className="mb-8 lg:hidden">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <FileSpreadsheet size={26} />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
            CSV<span className="text-emerald-600">Tool</span>
          </h1>
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-700">
            Welcome back
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Sign in to your account
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Enter your account details to access your workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
            </div>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-12 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3.5 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/15 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={15} className="text-emerald-600" />
          Secure sign-in to your workspace
        </div>
      </div>
    </div>
  </section>
</main>

);
};

export default Login;
