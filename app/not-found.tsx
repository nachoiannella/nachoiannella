import Link from 'next/link';
import { T } from '@/components/T';

export default function NotFound() {
  return (
    <main id="main" className="mx-auto grid min-h-dvh max-w-3xl place-content-center px-5 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">404 · <T en="Flight not found" es="Vuelo no encontrado" /></p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight"><T en="This gate doesn’t exist." es="Esta puerta de embarque no existe." /></h1>
      <Link href="/" className="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-semibold text-accent-fg"><T en="Back to the board" es="Volver al tablero" /></Link>
    </main>
  );
}
