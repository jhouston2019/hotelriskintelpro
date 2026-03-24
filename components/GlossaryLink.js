import Link from "next/link";

/**
 * Links to /dashboard-help#{id}. Use for any dashboard term with a matching glossary id.
 */
export default function GlossaryLink({ id, className = "", title, children, compact }) {
  const href = `/dashboard-help#${id}`;
  const label = title || "Definition and how-to";

  if (children) {
    return (
      <Link href={href} className={className} title={label} aria-label={label}>
        {children}
      </Link>
    );
  }

  if (compact) {
    return (
      <Link
        href={href}
        className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border border-slate-500/80 bg-slate-800 text-[9px] font-bold leading-none text-slate-400 hover:border-amber-500/70 hover:text-amber-300 ${className}`}
        title={label}
        aria-label={`${label}: open glossary`}
      >
        ?
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-0.5 text-xs font-semibold text-amber-400/90 hover:text-amber-300 underline-offset-2 hover:underline ${className}`}
      title={label}
    >
      <span aria-hidden className="text-[10px]">ⓘ</span>
      <span className="sr-only">{label}</span>
    </Link>
  );
}
