import type { L } from '@/lib/types';

export type CaseMeta = {
  slug: string;
  index: string;
  company: string;
  period: string;
  stage: L;          // trip stage: before / buying / during
  title: L;
  dek: L;
  role: L;
  team: L;
  highlights: L[];   // 5-minute mode bullets
  outcome: L;
  accent: string;    // used for the abstract illustration
};

export const cases: CaseMeta[] = [
  {
    slug: 'despegar-cart-cross-sell',
    index: '01',
    company: 'Despegar',
    period: '2025 —',
    stage: { en: 'Buying the trip', es: 'Comprar el viaje' },
    title: { en: 'One cart for the whole trip', es: 'Un carrito para todo el viaje' },
    dek: {
      en: 'Leading UX for Packages, Cart & Cross-sell: how a travel company that sold products one by one learns to sell a trip.',
      es: 'Liderando UX de Paquetes, Carrito y Cross-sell: cómo una empresa que vendía productos de a uno aprende a vender un viaje.',
    },
    role: { en: 'UX Manager · Cart & Cross-sell', es: 'UX Manager · Carrito y Cross-sell' },
    team: { en: '3 designers + the Cart & Cross-sell squad (product, engineering)', es: '3 diseñadores + el squad de Carrito y Cross-sell (producto, ingeniería)' },
    highlights: [
      { en: 'Cart launched Dec 2025 on web + app: flights, several hotels on different dates, cars, transfers and activities in a single purchase.', es: 'Carrito lanzado en dic. 2025 en web + app: vuelos, varios hoteles en distintas fechas, autos, traslados y actividades en una sola compra.' },
      { en: 'Joined when the cart was at a very early stage and brought new ways of working — thinking outside the box with product and engineering.', es: 'Llegué con el carrito en una etapa muy temprana y sumé nuevas formas de hacer — pensando fuera de la caja con producto e ingeniería.' },
      { en: 'Smart combinations to maximize discounts; integrated with SOFIA; rolled out to Brazil (Decolar) in 2026.', es: 'Combinaciones inteligentes para maximizar descuentos; integrado con SOFIA; lanzado en Brasil (Decolar) en 2026.' },
    ],
    outcome: { en: 'Live on web + app since Dec 2025; launched in Brazil in 2026. Presented by Despegar as the first online tool of its kind in travel.', es: 'En web + app desde dic. 2025; lanzado en Brasil en 2026. Despegar lo presenta como la primera herramienta online de su tipo en viajes.' },
    accent: '#ff8a3d',
  },
  {
    slug: 'sofia-ai-travel-assistant',
    index: '02',
    company: 'Despegar',
    period: '2022 — 2024',
    stage: { en: 'Before the trip', es: 'Antes del viaje' },
    title: { en: 'SOFIA: a travel agent that isn’t a chatbot', es: 'SOFIA: una agente de viajes que no es un chatbot' },
    dek: {
      en: 'Designing Despegar’s generative-AI travel assistant from scratch — a conversation you can also tap, speak and see.',
      es: 'Diseñar desde cero la asistente de viajes con IA generativa de Despegar — una conversación que también se puede tocar, hablar y ver.',
    },
    role: { en: 'Sr. UX/UI Designer → Senior Product Designer', es: 'Sr. UX/UI Designer → Senior Product Designer' },
    team: { en: 'Cross-functional SOFIA team — platform designed from scratch', es: 'Equipo multidisciplinario de SOFIA — plataforma diseñada desde cero' },
    highlights: [
      { en: 'Launched across Latin America in March 2024 as the region’s first generative-AI travel assistant (per Despegar).', es: 'Lanzada en toda Latinoamérica en marzo de 2024 como la primera asistente de viajes con IA generativa de la región (según Despegar).' },
      { en: 'Multimodal: chat, voice, images — or skip the chat entirely and just tap the visual options it builds.', es: 'Multimodal: chat, voz, imágenes — o saltearte el chat y solo tocar las opciones visuales que va armando.' },
      { en: 'Non-linear conversation that ends in concrete recommendations, self-serve purchase or a hand-off to a human.', es: 'Conversación no lineal que termina en recomendaciones concretas, compra autoasistida o derivación a una persona.' },
    ],
    outcome: { en: 'Launched across Latin America in March 2024; now part of the purchase, integrated into the cart.', es: 'Lanzada en toda Latinoamérica en marzo de 2024; hoy es parte de la compra, integrada al carrito.' },
    accent: '#a78bfa',
  },
  {
    slug: 'travel-mode',
    index: '03',
    company: 'Despegar',
    period: '2022 — 2024',
    stage: { en: 'During the trip', es: 'Durante el viaje' },
    title: { en: 'Travel Mode: the app that comes with you', es: 'Modo Viaje: la app que viaja con vos' },
    dek: {
      en: 'Turning a booking app into a travel companion — offline vouchers, context at the destination, and the right offer at the right moment.',
      es: 'Convertir una app de reservas en compañera de viaje — vouchers offline, contexto en destino y la oferta correcta en el momento correcto.',
    },
    role: { en: 'Sr. UX/UI Designer · ideation → production', es: 'Sr. UX/UI Designer · ideación → producción' },
    team: { en: 'With my content-design partner (UX writer)', es: 'Con mi partner de content design (UX writer)' },
    highlights: [
      { en: 'Designed from scratch, from ideation to production, with my content-design partner.', es: 'Diseñado desde cero, de la ideación a producción, con mi partner de content design.' },
      { en: 'The first Despegar app feature that works without a connection — 100% native, new for Despegar.', es: 'La primera funcionalidad de la app de Despegar que funciona sin conexión — 100% nativa, nueva para Despegar.' },
      { en: 'Activates automatically when the trip dates arrive: bookings and vouchers at hand, nearby places and events.', es: 'Se activa sola cuando llegan las fechas del viaje: reservas y vouchers a mano, lugares y eventos cercanos.' },
    ],
    outcome: { en: 'Shipped: the first offline feature in the Despegar app, designed from scratch.', es: 'En producción: la primera funcionalidad offline de la app de Despegar, diseñada desde cero.' },
    accent: '#34d399',
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
