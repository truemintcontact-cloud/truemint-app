type Launch = {
  name: string; ticker: string; status: "draft" | "scheduled" | "live";
  when?: string; supply: number; devPct: number;
};
const MOCK: Launch[] = [
  { name: "SunCat", ticker: "SCAT", status: "scheduled", when: "in 2h", supply: 1_000_000, devPct: 5 },
  { name: "Pixel Ape", ticker: "PAPE", status: "live", supply: 2_000_000, devPct: 3 },
  { name: "Void", ticker: "VOID", status: "draft", supply: 10_000_000, devPct: 0 },
];

function Pill({ status }: { status: Launch["status"] }) {
  const map = {
    live: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
    scheduled: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
    draft: "bg-white/5 text-white/70 border-white/10",
  } as const;
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${map[status]}`}>{status}</span>;
}

export default function LaunchesPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-semibold mb-2">Launches</h1>
      <p className="opacity-80 mb-6">Browse upcoming and recent launches. Fair rules apply to all.</p>

      <div className="grid md:grid-cols-3 gap-4">
        {MOCK.map((x) => (
          <div key={x.ticker} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{x.name} <span className="opacity-70">· {x.ticker}</span></div>
              <Pill status={x.status} />
            </div>
            <div className="text-sm opacity-80 space-y-1">
              <div>Supply: <b>{x.supply.toLocaleString()}</b></div>
              <div>Dev allocation: <b>{x.devPct}%</b> (vests 1%/day)</div>
              {x.when && <div>Starts: <b>{x.when}</b></div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
