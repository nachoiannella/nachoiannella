'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { T } from '@/components/T';
import { usePrefs } from '@/components/Prefs';
import type { L } from '@/lib/types';
import { WHY, type Verdict } from '@/content/prototype';

type Placement = 'inline' | 'sidebar' | 'interstitial';
type Anchor = 'total' | 'perDay' | 'bundle';

const PRICES = { flight: 412, hotel: 630, car: 190, carRef: 215, days: 5 };
const fmt = (n: number) => `US$ ${n.toLocaleString('en-US')}`;

const OPT = {
  placement: [
    { v: 'inline', l: { en: 'In the cart', es: 'En el carrito' } },
    { v: 'sidebar', l: { en: 'Sidebar', es: 'Lateral' } },
    { v: 'interstitial', l: { en: 'Before paying', es: 'Antes de pagar' } },
  ],
  preselected: [
    { v: 'off', l: { en: 'Opt-in', es: 'Opt-in' } },
    { v: 'on', l: { en: 'Pre-selected', es: 'Preseleccionado' } },
  ],
  anchor: [
    { v: 'total', l: { en: 'Total price', es: 'Precio total' } },
    { v: 'perDay', l: { en: 'Per day', es: 'Por día' } },
    { v: 'bundle', l: { en: 'Bundle saving', es: 'Ahorro por combinar' } },
  ],
} as const;

const PICK = { placement: 'inline' as Placement, pre: false, anchor: 'bundle' as Anchor };

function Seg<T extends string>({ legend, name, value, options, onChange }: { legend: L; name: string; value: T; options: readonly { v: string; l: L }[]; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 font-mono text-xs uppercase tracking-wider text-muted"><T t={legend} /></legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <label key={o.v} className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${value === o.v ? 'border-fg bg-fg text-bg' : 'border-line text-fg hover:border-fg/50'}`}>
            <input type="radio" name={name} value={o.v} checked={value === o.v} onChange={() => onChange(o.v as T)} className="sr-only" />
            <T t={o.l} />
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const VERDICT = {
  yes: { cls: 'text-ok', en: '✓ I’d pick it', es: '✓ Lo elijo' },
  meh: { cls: 'text-warn', en: '~ Depends', es: '~ Depende' },
  no: { cls: 'text-bad', en: '✕ I’d avoid it', es: '✕ Lo evito' },
};

export function Prototype() {
  const { lang } = usePrefs();
  const [placement, setPlacement] = useState<Placement>('sidebar');
  const [pre, setPre] = useState(true);
  const [anchor, setAnchor] = useState<Anchor>('total');
  const [added, setAdded] = useState(true);
  const [modal, setModal] = useState(false);
  const [paid, setPaid] = useState(false);
  const [clicks, setClicks] = useState(0);
  const uid = useId();
  const firstBtn = useRef<HTMLButtonElement>(null);
  const payBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => { setAdded(pre); setPaid(false); setModal(false); setClicks(0); }, [pre, placement, anchor]);
  useEffect(() => { if (modal) firstBtn.current?.focus(); }, [modal]);

  const total = PRICES.flight + PRICES.hotel + (added ? PRICES.car : 0);
  const steps = placement === 'interstitial' ? 2 : 1;

  const pay = () => {
    setClicks((c) => c + 1);
    if (placement === 'interstitial' && !modal && clicks === 0) { setModal(true); return; }
    setModal(false); setPaid(true);
  };
  const closeModal = (add: boolean) => { if (add) setAdded(true); setClicks((c) => c + 1); setModal(false); setPaid(true); payBtn.current?.focus(); };

  const price = (
    <span className="sm:text-right">
      {anchor === 'total' && <span className="font-semibold">{fmt(PRICES.car)}</span>}
      {anchor === 'perDay' && (<><span className="font-semibold">US$ {PRICES.car / PRICES.days}</span><span className="text-muted"> <T en="/ day" es="/ día" /></span><span className="block text-xs text-muted"><T en={`${fmt(PRICES.car)} total`} es={`${fmt(PRICES.car)} en total`} /></span></>)}
      {anchor === 'bundle' && (<><s className="mr-1.5 text-sm text-muted"><span className="sr-only"><T en="Separately: " es="Por separado: " /></span>{fmt(PRICES.carRef)}</s><span className="font-semibold">{fmt(PRICES.car)}</span><span className="block text-xs font-medium text-ok"><T en={`Save US$ ${PRICES.carRef - PRICES.car} adding it to this trip`} es={`Ahorrás US$ ${PRICES.carRef - PRICES.car} sumándolo a este viaje`} /></span></>)}
    </span>
  );

  const addon = (compact = false) => (
    <div className={`rounded-xl border-2 border-dashed p-3.5 transition-colors ${added ? 'border-accent bg-accent/5' : 'border-line'}`}>
      <label className="grid cursor-pointer grid-cols-[auto_1fr] items-start gap-x-3 gap-y-2">
        <input type="checkbox" checked={added} onChange={(e) => setAdded(e.target.checked)} className="mt-1 size-4 accent-[var(--accent)]" />
        <span className={`flex flex-wrap items-start justify-between gap-x-4 gap-y-1 ${compact ? 'flex-col' : ''}`}>
          <span>
            <span className="block font-medium"><T en="Add a car in Rio" es="Sumá un auto en Río" /></span>
            {!compact && <span className="block text-sm text-muted"><T en="Compact · 5 days · pick up at GIG" es="Compacto · 5 días · retiro en GIG" /></span>}
          </span>
          {price}
        </span>
      </label>
      {pre && <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-bad"><T en="Pre-selected for you" es="Preseleccionado para vos" /></p>}
    </div>
  );

  const Row = ({ icon, t, sub, p }: { icon: string; t: L; sub: L; p: number }) => (
    <li className="flex items-start gap-3 py-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-bg-2 text-base" aria-hidden="true">{icon}</span>
      <span className="flex-1"><span className="block font-medium"><T t={t} /></span><span className="block text-sm text-muted"><T t={sub} /></span></span>
      <span className="font-semibold">{fmt(p)}</span>
    </li>
  );

  const items = (
    <ul className="divide-y divide-line">
      <Row icon="✈" t={{ en: 'Flight EZE → GIG', es: 'Vuelo EZE → GIG' }} sub={{ en: 'Round trip · 2 adults', es: 'Ida y vuelta · 2 adultos' }} p={PRICES.flight} />
      <Row icon="▣" t={{ en: 'Hotel in Copacabana', es: 'Hotel en Copacabana' }} sub={{ en: '5 nights · breakfast included', es: '5 noches · desayuno incluido' }} p={PRICES.hotel} />
    </ul>
  );

  const summary = (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between border-t border-line pt-3">
        <span className="text-muted"><T en="Total" es="Total" /></span>
        <span className="text-2xl font-semibold tracking-tight" aria-live="polite">{fmt(total)}</span>
      </div>
      <button ref={payBtn} type="button" onClick={pay} className="w-full rounded-xl bg-accent px-4 py-3 font-semibold text-accent-fg transition-transform active:scale-[.99]">
        {paid ? <T en="✓ Paid (demo)" es="✓ Pagado (demo)" /> : <T en="Continue to payment" es="Continuar al pago" />}
      </button>
    </div>
  );

  const choice = [WHY[placement], WHY[pre ? 'on' : 'off'], WHY[anchor]];
  const isPick = placement === PICK.placement && pre === PICK.pre && anchor === PICK.anchor;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
      {/* Controls + rationale */}
      <div className="space-y-6">
        <Seg legend={{ en: '1 · Where does the add-on live?', es: '1 · ¿Dónde vive el add-on?' }} name={`${uid}-p`} value={placement} options={OPT.placement} onChange={setPlacement} />
        <Seg legend={{ en: '2 · Default state', es: '2 · Estado por defecto' }} name={`${uid}-d`} value={pre ? 'on' : 'off'} options={OPT.preselected} onChange={(v) => setPre(v === 'on')} />
        <Seg legend={{ en: '3 · Price framing', es: '3 · Cómo se muestra el precio' }} name={`${uid}-a`} value={anchor} options={OPT.anchor} onChange={setAnchor} />

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => { setPlacement(PICK.placement); setPre(PICK.pre); setAnchor(PICK.anchor); }} disabled={isPick}
            className="rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg disabled:opacity-50">
            {isPick ? <T en="✓ This is my pick" es="✓ Esta es mi elección" /> : <T en="Show me Nacho’s pick" es="Mostrame la elección de Nacho" />}
          </button>
        </div>

        <div className="rounded-2xl border border-line bg-card p-5" aria-live="polite">
          <p className="font-mono text-xs uppercase tracking-wider text-accent"><T en="Why: design notes" es="Por qué: notas de diseño" /></p>
          <ol className="mt-3 space-y-4">
            {choice.map((c, i) => (
              <li key={i} className="text-[0.95rem] leading-relaxed">
                <span className={`mr-2 font-mono text-xs font-semibold uppercase ${VERDICT[c.v].cls}`}><T en={VERDICT[c.v].en} es={VERDICT[c.v].es} /></span>
                <T t={c.t} />
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Live mock */}
      <div>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-card shadow-xl shadow-black/5">
          <div className="flex items-center gap-1.5 border-b border-line bg-bg-2 px-4 py-2.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-line" /><span className="size-2.5 rounded-full bg-line" /><span className="size-2.5 rounded-full bg-line" />
            <span className="ml-3 font-mono text-[11px] text-muted">checkout.example/cart</span>
          </div>
          <div className="p-5 sm:p-6" aria-label={lang === 'es' ? 'Checkout de ejemplo' : 'Sample checkout'} role="group">
            <p className="font-mono text-xs uppercase tracking-wider text-muted"><T en="Your trip" es="Tu viaje" /></p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight"><T en="Buenos Aires → Rio · 5 nights" es="Buenos Aires → Río · 5 noches" /></h3>
            <div className={`mt-4 grid gap-6 ${placement === 'sidebar' ? 'sm:grid-cols-[1fr_200px]' : ''}`}>
              <div>
                {items}
                {placement === 'inline' && <div className="mt-1">{addon()}</div>}
                {placement !== 'sidebar' && <div className="mt-4">{summary}</div>}
              </div>
              {placement === 'sidebar' && (
                <aside className="space-y-4">
                  {summary}
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted"><T en="You may also like" es="También te puede interesar" /></p>
                  {addon(true)}
                </aside>
              )}
            </div>
          </div>

          {modal && (
            <div className="absolute inset-0 z-10 grid place-items-center bg-black/50 p-5 backdrop-blur-[2px]" onKeyDown={(e) => e.key === 'Escape' && closeModal(false)}>
              <div role="dialog" aria-labelledby={`${uid}-m`} className="w-full max-w-sm rounded-2xl bg-card p-5 shadow-2xl">
                <h4 id={`${uid}-m`} className="text-lg font-semibold"><T en="Wait! Need a car in Rio?" es="¡Esperá! ¿Necesitás auto en Río?" /></h4>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-bg-2 p-3"><T en="Compact · 5 days" es="Compacto · 5 días" />{price}</div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button ref={firstBtn} type="button" onClick={() => closeModal(false)} className="rounded-xl border border-line px-3 py-2.5 text-sm"><T en="No, thanks" es="No, gracias" /></button>
                  <button type="button" onClick={() => closeModal(true)} className="rounded-xl bg-accent px-3 py-2.5 text-sm font-semibold text-accent-fg"><T en="Add car" es="Sumar auto" /></button>
                </div>
              </div>
            </div>
          )}
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line text-sm">
          <div className="bg-card p-3.5"><dt className="font-mono text-[11px] uppercase tracking-wider text-muted"><T en="Steps to pay" es="Pasos para pagar" /></dt><dd className={`mt-1 text-lg font-semibold ${steps > 1 ? 'text-warn' : ''}`}>{steps}</dd></div>
          <div className="bg-card p-3.5"><dt className="font-mono text-[11px] uppercase tracking-wider text-muted"><T en="Consent" es="Consentimiento" /></dt><dd className={`mt-1 text-lg font-semibold ${pre ? 'text-bad' : 'text-ok'}`}>{pre ? <T en="Implicit" es="Implícito" /> : <T en="Explicit" es="Explícito" />}</dd></div>
          <div className="bg-card p-3.5"><dt className="font-mono text-[11px] uppercase tracking-wider text-muted"><T en="Real cost visible" es="Costo real visible" /></dt><dd className={`mt-1 text-lg font-semibold ${anchor === 'perDay' ? 'text-warn' : 'text-ok'}`}>{anchor === 'perDay' ? <T en="Secondary" es="Secundario" /> : <T en="Yes" es="Sí" />}</dd></div>
        </dl>
      </div>
    </div>
  );
}
