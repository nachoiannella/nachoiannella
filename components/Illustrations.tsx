/* Abstract, code-built UI illustrations. No screenshots, no logos. */
export function CaseArt({ slug, accent }: { slug: string; accent: string }) {
  const s = { '--a': accent } as React.CSSProperties;
  if (slug === 'despegar-cart-cross-sell') {
    return (
      <div style={s} aria-hidden="true" className="relative h-full w-full overflow-hidden p-5">
        <div className="mx-auto flex max-w-[240px] flex-col gap-2">
          {[['✈', 72], ['▣', 58], ['▣', 44], ['◐', 36]].map(([g, w], i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-line bg-card px-2.5 py-2 shadow-sm">
              <span className="grid size-6 place-items-center rounded-md text-[11px]" style={{ background: 'color-mix(in oklab, var(--a) 22%, transparent)', color: 'var(--fg)' }}>{g}</span>
              <span className="h-1.5 rounded-full bg-line" style={{ width: `${w}%` }} />
              <span className="ml-auto h-1.5 w-8 rounded-full bg-line" />
            </div>
          ))}
          <div className="mt-1 flex items-center justify-between rounded-lg px-2.5 py-2" style={{ background: 'var(--a)' }}>
            <span className="h-1.5 w-16 rounded-full bg-black/30" />
            <span className="h-2 w-10 rounded-full bg-black/45" />
          </div>
        </div>
      </div>
    );
  }
  if (slug === 'sofia-ai-travel-assistant') {
    return (
      <div style={s} aria-hidden="true" className="relative h-full w-full overflow-hidden p-5">
        <div className="mx-auto flex max-w-[250px] flex-col gap-2">
          <div className="ml-auto rounded-2xl rounded-br-sm bg-fg px-3 py-2 font-mono text-[11px] text-bg">quiero hacer surf 🏄</div>
          <div className="flex items-center gap-1.5">
            <span className="size-5 rounded-full" style={{ background: 'var(--a)' }} />
            <span className="h-1.5 w-28 rounded-full bg-line" />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-line bg-card p-1.5 shadow-sm">
                <div className="h-8 rounded-md" style={{ background: `color-mix(in oklab, var(--a) ${30 + i * 15}%, transparent)` }} />
                <div className="mt-1.5 h-1 w-3/4 rounded-full bg-line" />
                <div className="mt-1 h-1 w-1/2 rounded-full bg-line" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-line bg-card px-2.5 py-1.5">
            <span className="h-1.5 flex-1 rounded-full bg-line" />
            <span className="grid size-5 place-items-center rounded-full text-[10px]" style={{ background: 'var(--a)', color: '#111' }}>🎙</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={s} aria-hidden="true" className="relative h-full w-full overflow-hidden p-5">
      <div className="mx-auto h-full max-w-[150px] rounded-[22px] border-2 border-line bg-card p-2 shadow-sm">
        <div className="flex items-center justify-between px-1">
          <span className="h-1 w-6 rounded-full bg-line" />
          <span className="rounded-full px-1.5 py-px font-mono text-[8px] uppercase" style={{ background: 'var(--a)', color: '#0b0b0a' }}>offline ✓</span>
        </div>
        <div className="relative mt-2 h-16 overflow-hidden rounded-xl bg-bg-2">
          {[[20, 30], [60, 55], [42, 70], [75, 25]].map(([x, y], i) => (
            <span key={i} className="absolute size-2 rounded-full" style={{ left: `${x}%`, top: `${y}%`, background: i === 1 ? 'var(--a)' : 'var(--muted)' }} />
          ))}
        </div>
        <div className="mt-2 rounded-lg border border-dashed p-1.5" style={{ borderColor: 'var(--a)' }}>
          <div className="h-1 w-2/3 rounded-full bg-line" />
          <div className="mt-1 flex gap-0.5">{Array.from({ length: 14 }).map((_, i) => <span key={i} className="h-3 w-[3px] bg-fg/60" style={{ height: i % 3 ? 12 : 8 }} />)}</div>
        </div>
        <div className="mt-2 h-1.5 w-1/2 rounded-full bg-line" />
      </div>
    </div>
  );
}
