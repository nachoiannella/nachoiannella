import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Nacho Iannella — Product design leader in travel e-commerce';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const rows = [
  ['SOFIA', 'Gen-AI travel assistant', 'SHIPPED', '#7ee2a8'],
  ['CARRITO', 'Multi-product cart', 'SHIPPED', '#7ee2a8'],
  ['PAQ+XSELL', 'Packages & cross-sell', 'IN PROD', '#ffb020'],
];

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0d0d0c', color: '#f3f1ea', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, color: '#a8a397', letterSpacing: 4, textTransform: 'uppercase' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#ff8a3d' }} />
          Nacho, en producción
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 74, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3 }}>
          <span style={{ color: '#a8a397' }}>I lead the design of how</span>
          <span>Latin America buys its trips.</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 28 }}>
            <span style={{ fontWeight: 700 }}>Nacho Iannella</span>
            <span style={{ color: '#a8a397' }}>UX Manager · Despegar · Buenos Aires</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, border: '1px solid #2e2d29', borderRadius: 16, padding: '16px 22px', fontSize: 20, fontFamily: 'monospace' }}>
            {rows.map(([a, b, c, col]) => (
              <div key={a} style={{ display: 'flex', gap: 24, justifyContent: 'space-between', width: 560 }}>
                <span style={{ fontWeight: 700, width: 140 }}>{a}</span>
                <span style={{ color: '#a8a397', flex: 1 }}>{b}</span>
                <span style={{ color: col, fontWeight: 700 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
