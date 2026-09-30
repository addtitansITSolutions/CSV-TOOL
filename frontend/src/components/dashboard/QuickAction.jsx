import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const QuickAction = ({ title, description, icon: Icon, to }) => {
  return (
    <Link
      to={to}
      className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm"
    >
      <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600">
        <Icon size={22} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-slate-800">
          {title}
        </h3>
        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <ArrowUpRight
        size={18}
        className="text-slate-400 transition group-hover:text-emerald-600"
      />
    </Link>
  );
};

export default QuickAction;