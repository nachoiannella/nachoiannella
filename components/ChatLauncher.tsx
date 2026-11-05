'use client';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { T } from '@/components/T';

const ChatPanel = dynamic(() => import('@/components/ChatPanel'), { ssr: false });

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  return (
    <>
      {open && <ChatPanel onClose={() => { setOpen(false); btn.current?.focus(); }} />}
      <button ref={btn} type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="ask-panel"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-fg p-3 text-sm sm:px-4 font-medium text-bg shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5">
        <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-accent text-xs font-bold text-accent-fg sm:size-5 sm:text-[11px]">?</span>
        <span className="sr-only sm:not-sr-only">{open ? <T en="Close" es="Cerrar" /> : <T en="Ask my portfolio" es="Preguntale a mi portfolio" />}</span>
      </button>
    </>
  );
}
