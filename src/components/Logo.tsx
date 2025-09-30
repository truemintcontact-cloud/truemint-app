export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="0" y="0" width="24" height="24" rx="6" fill="#34d399" />{/* emerald-400 */}
        {/* T */}
        <path d="M6 7h12" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 7v10" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" />
        {/* M */}
        <path d="M6 17V9l6 6 6-6v8" stroke="#0B1220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      <span className="font-semibold">True Mint</span>
    </div>
  );
}
