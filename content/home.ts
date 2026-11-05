/**
 * All homepage copy lives here (EN + ES/voseo) so the page and the
 * "Ask my portfolio" chat read from the same source of truth.
 *
 * Placeholders, if ever needed: see README (todo syntax). None are in use.
 * Every fact is sourced — see SOURCES.md. Numbers are intentionally not shown (possibly confidential).
 */
import type { L } from '@/lib/types';

export const hero = {
  kicker: { en: 'Nacho, en producción', es: 'Nacho, en producción' } as L,
  status: { en: 'status: shipping', es: 'estado: shippeando' } as L,
  h1a: { en: 'I lead the design of how', es: 'Lidero el diseño de cómo' } as L,
  h1b: { en: 'Latin America buys its trips.', es: 'Latinoamérica compra sus viajes.' } as L,
  sub: {
    en: 'UX Manager at **Despegar** for Packages, Cart & Cross-sell. A product + design leader who ships: I designed **SOFIA**, Despegar’s generative-AI travel assistant, from scratch. Today I lead the design of its multi-product **shopping cart** and cross-sell.',
    es: 'UX Manager en **Despegar** para Paquetes, Carrito y Cross-sell. Un líder de producto + diseño que shippea: diseñé **SOFIA**, la asistente de viajes con IA generativa de Despegar, desde cero. Hoy lidero el diseño de su **carrito de compras** multiproducto y el cross-sell.',
  } as L,
  ctaWork: { en: 'See the work', es: 'Ver el trabajo' } as L,
  ctaContact: { en: 'Let’s talk', es: 'Hablemos' } as L,
  location: { en: 'Buenos Aires · ES / EN', es: 'Buenos Aires · ES / EN' } as L,
};

/** Code-built "departures board" — no screenshots, no logos. */
export const board: { code: string; what: L; year: string; status: 'shipped' | 'live' | 'proto' | 'building' }[] = [
  { code: 'SOFIA', what: { en: 'Gen-AI travel assistant', es: 'Asistente de viajes con IA' }, year: '2024', status: 'shipped' },
  { code: 'CARRITO', what: { en: 'Multi-product cart', es: 'Carrito multiproducto' }, year: '2025', status: 'shipped' },
  { code: 'MODO VIAJE', what: { en: 'In-trip app mode', es: 'Modo de la app en viaje' }, year: '–', status: 'shipped' },
  { code: 'PAQ+XSELL', what: { en: 'Packages & cross-sell', es: 'Paquetes y cross-sell' }, year: 'NOW', status: 'live' },
  { code: 'POGO.AR', what: { en: 'Live-music map (side)', es: 'Mapa de recitales (propio)' }, year: 'NOW', status: 'building' },
  { code: 'BROT', what: { en: 'AI desk companion (side)', es: 'Compañero de escritorio IA' }, year: '2026', status: 'proto' },
];

export const modes = {
  label: { en: 'How much time do you have?', es: '¿Cuánto tiempo tenés?' } as L,
  short: { en: 'Reading depth', es: 'Profundidad' } as L,
  options: [
    { v: '30', label: { en: '30 sec', es: '30 seg' }, hint: { en: 'TL;DR', es: 'TL;DR' } },
    { v: '5', label: { en: '5 min', es: '5 min' }, hint: { en: 'Highlights', es: 'Highlights' } },
    { v: '20', label: { en: '20 min', es: '20 min' }, hint: { en: 'Full case studies', es: 'Casos completos' } },
  ] as const,
};

export const tldr = {
  title: { en: 'The 30-second version', es: 'La versión de 30 segundos' } as L,
  items: [
    { en: '**UX Manager at Despegar** (since Sep 2025), leading design for Packages, Cart & Cross-sell with a team of 3 designers.', es: '**UX Manager en Despegar** (desde sep. 2025), liderando diseño de Paquetes, Carrito y Cross-sell con un equipo de 3 diseñadores.' },
    { en: 'Carrying the vision of Despegar’s **shopping cart and cross-sell** with the Cart & Cross-sell squad. The cart launched in Dec 2025: flights, hotels, cars, transfers and activities in one purchase.', es: 'Llevando la visión del **carrito de compras y el cross-sell** de Despegar junto al squad de Carrito y Cross-sell. El carrito se lanzó en dic. 2025: vuelos, hoteles, autos, traslados y actividades en una sola compra.' },
    { en: 'Designed **SOFIA** from scratch, Despegar’s generative-AI travel assistant, launched across Latin America in March 2024.', es: 'Diseñó **SOFIA** desde cero, la asistente de viajes con IA generativa de Despegar, lanzada en toda Latinoamérica en marzo de 2024.' },
    { en: 'Designed **Travel Mode** end to end: the first Despegar app feature that works without a connection.', es: 'Diseñó **Modo Viaje** de punta a punta: la primera funcionalidad de la app de Despegar que funciona sin conexión.' },
    { en: 'Before: Senior UX Designer at **Mercado Libre** (First Party), Product UX Designer at **Banco Galicia**.', es: 'Antes: Senior UX Designer en **Mercado Libre** (First Party), Product UX Designer en **Banco Galicia**.' },
    { en: 'Building **pogo.ar** on the side, end to end: every live-music show in Argentina on one map.', es: 'Construyendo **pogo.ar** por su cuenta, de punta a punta: todos los recitales de Argentina en un solo mapa.' },
    { en: '**AI-first:** designs with AI support every day: research, prototyping in v0, even Figma through MCPs.', es: '**AI-first:** diseña con IA todos los días: research, prototipado en v0 y hasta Figma a través de MCPs.' },
  ] as L[],
  more: { en: 'Got more time? Switch to 5 or 20 minutes above.', es: '¿Tenés más tiempo? Pasá a 5 o 20 minutos arriba.' } as L,
};

export const experience = {
  title: { en: 'Where I’ve shipped', es: 'Dónde shippeé' } as L,
  items: [
    { when: '2025–', org: 'Despegar', role: { en: 'UX Manager · Packages, Cart & Cross-sell', es: 'UX Manager · Paquetes, Carrito y Cross-sell' }, note: { en: 'Leading a team of 3 designers. With the Cart & Cross-sell squad, engineering and product, carrying the vision of the shopping cart and cross-selling. Cart launched Dec 2025 (web + app), then in Brazil as Decolar.', es: 'Lidero un equipo de 3 diseñadores. Con el squad de Carrito y Cross-sell, ingeniería y producto, llevamos la visión del carrito de compras y el cross-selling. Carrito lanzado en dic. 2025 (web + app) y luego en Brasil como Decolar.' } },
    { when: '2024–2025', org: 'Mercado Libre', role: { en: 'Senior UX Designer · First Party', es: 'Senior UX Designer · First Party' }, note: { en: 'In the First Party team. A big project: the whole internal approval flow for contracts between suppliers and Mercado Libre.', es: 'En el equipo de First Party. Un proyecto grande: todo el flujo interno de aprobación de contratos entre proveedores y Mercado Libre.' } },
    { when: '2022–2024', org: 'Despegar', role: { en: 'Sr. UX/UI Designer → Senior Product Designer', es: 'Sr. UX/UI Designer → Senior Product Designer' }, note: { en: 'Designed SOFIA (gen-AI travel assistant) from scratch, and Travel Mode, the app’s first offline feature, from ideation to production.', es: 'Diseñé SOFIA (asistente con IA generativa) desde cero, y Modo Viaje, la primera funcionalidad offline de la app, de la ideación a producción.' } },
    { when: '2018–2022', org: 'Banco Galicia', role: { en: 'Product UX Designer', es: 'Product UX Designer' }, note: { en: 'Core digital-banking features, including the app’s security section (passwords, tokens and security keys in one place).', es: 'Funcionalidades core de banca digital, incluida la sección de seguridad de la app (claves, tokens y llaves de seguridad en un solo lugar).' } },
    { when: '2012–', org: { en: 'Before product', es: 'Antes de producto' }, role: { en: 'Web design, front-end & agency work', es: 'Diseño web, front-end y agencia' }, note: { en: 'Spinta Media (web design & online marketing agency), Universidad de Palermo design awards (2012–2013), Platzi UX/UI program. I still write code, and it shows in how I prototype.', es: 'Spinta Media (agencia de diseño web y marketing online), premios de diseño en la Universidad de Palermo (2012–2013), carrera UX/UI en Platzi. Sigo escribiendo código y se nota en cómo prototipo.' } },
  ] as { when: string; org: string | L; role: L; note: L }[],
};

export const work = {
  title: { en: 'Selected work', es: 'Trabajo seleccionado' } as L,
  intro: {
    en: 'I’ve designed for the whole trip: **before** it (SOFIA, inspiration and planning), **at the moment of buying** (the cart and cross-sell), and **during** it (Travel Mode).',
    es: 'Diseñé para todo el viaje: **antes** (SOFIA, inspiración y planificación), **en el momento de comprar** (carrito y cross-sell) y **durante** (Modo Viaje).',
  } as L,
  readFull: { en: 'Read the case study', es: 'Leer el caso' } as L,
  fullBelow: { en: 'Full case study', es: 'Caso completo' } as L,
};

export const prototype = {
  title: { en: 'Cross-sell, one decision at a time', es: 'Cross-sell, una decisión a la vez' } as L,
  intro: {
    en: 'A tiny checkout you can play with. Flip the design decisions I argue about every week (where the add-on lives, whether it’s pre-selected, how the price is framed) and see what changes for the traveler.',
    es: 'Un checkout chiquito para jugar. Cambiá las decisiones de diseño que discuto todas las semanas (dónde vive el add-on, si viene preseleccionado, cómo se presenta el precio) y mirá qué cambia para el viajero.',
  } as L,
  disclaimer: {
    en: 'I built this example for this site: the interface and the prices are made up.',
    es: 'Este ejemplo lo armé para este sitio: la interfaz y los precios son inventados.',
  } as L,
};

export const lead = {
  title: { en: 'How I lead', es: 'Cómo lidero' } as L,
  intro: {
    en: 'I lead by giving context and purpose, and I let the team decide how to solve the problem. Nothing motivates me more than seeing someone on the team grow, unblock a hard problem, or find a better solution than the one we imagined.',
    es: 'Lidero dando contexto y propósito, y dejo que el equipo decida cómo resolver. Nada me motiva más que ver a alguien del equipo crecer, destrabar un problema difícil o encontrar una solución mejor de la que imaginábamos.',
  } as L,
  team: {
    en: '**The team:** 3 designers (2 senior, 1 semi-senior) working with the Cart & Cross-sell squad (product and engineering) on packages, the shopping cart and cross-sell. I also help bring talent into the wider Shopping squad.',
    es: '**El equipo:** 3 diseñadores (2 senior, 1 semi-senior) trabajando con el squad de Carrito y Cross-sell (producto e ingeniería) en paquetes, carrito y cross-sell. También ayudo a sumar talento al squad de Shopping.',
  } as L,
  principles: [
    { k: '01', t: { en: 'Give context, then trust', es: 'Dar contexto y confiar' }, d: { en: 'I give the why, the purpose and the constraints, then trust the team to decide the how.', es: 'Doy el porqué, el propósito y las restricciones, y después confío en que el equipo decida el cómo.' } },
    { k: '02', t: { en: 'Complexity → simple decisions', es: 'Complejidad → decisiones simples' }, d: { en: 'My obsession: turn complexity into simple decisions, and simple decisions into products that work. A cart with five product types is the ultimate test.', es: 'Mi obsesión: convertir complejidad en decisiones simples, y decisiones simples en productos que funcionan. Un carrito con cinco tipos de producto es la prueba de fuego.' } },
    { k: '03', t: { en: 'Design moves metrics', es: 'El diseño mueve métricas' }, d: { en: 'I like working where UX, data, technology and strategy meet. Design is an engine for concrete business results.', es: 'Me gusta trabajar donde conviven UX, data, tecnología y estrategia. El diseño es un motor para mejorar métricas concretas.' } },
    { k: '04', t: { en: 'People grow, products follow', es: 'La gente crece, el producto acompaña' }, d: { en: 'Making things happen while helping people grow. The best products are built when teams grow alongside them.', es: 'Hacer que las cosas pasen mientras ayudo a que la gente crezca. Los mejores productos se construyen cuando los equipos crecen con ellos.' } },
  ] as { k: string; t: L; d: L }[],
  more: { en: 'Happy to go deeper on how I run the team in a conversation.', es: 'Si querés profundizar en cómo llevo el equipo, lo charlamos.' } as L,
};

export const ai = {
  eyebrow: { en: 'Design + AI', es: 'Diseño + IA' } as L,
  title: { en: 'I use AI to design, and I design AI products.', es: 'Uso IA para diseñar y diseño productos con IA.' } as L,
  intro: {
    en: 'Today I’m AI-first: I always design with AI support: for research, for prototyping, and even to help me design in Figma through the different MCPs available. For me AI isn’t a trend; it’s a concrete tool to power up teams, speed up decisions and create smarter experiences.',
    es: 'Hoy soy AI-first: siempre diseño con apoyo de IA: para research, para prototipar y hasta para ayudarme a diseñar en Figma a través de los distintos MCPs disponibles. Para mí la IA no es una tendencia; es una herramienta concreta para potenciar equipos, acelerar decisiones y crear experiencias más inteligentes.',
  } as L,
  items: [
    { tag: 'research', t: { en: 'Research with AI', es: 'Research con IA' }, d: { en: 'AI is part of how I research: it helps me get to the questions that matter faster, so the team spends its time on decisions.', es: 'La IA es parte de cómo hago research: me ayuda a llegar más rápido a las preguntas que importan, para que el equipo dedique su tiempo a decidir.' } },
    { tag: 'v0', t: { en: 'Prototypes that run', es: 'Prototipos que funcionan' }, d: { en: 'I build working prototypes in v0 instead of only static mocks, with real states and real interactions, so we test flows and align stakeholders on something that behaves like the product.', es: 'Armo prototipos funcionales en v0 en lugar de solo mocks estáticos, con estados e interacciones reales, para testear flujos y alinear stakeholders con algo que se comporta como el producto.' } },
    { tag: 'figma + mcp', t: { en: 'Figma, through MCPs', es: 'Figma, vía MCPs' }, d: { en: 'I use the MCPs available for Figma so AI helps me design right inside the tool where the team works.', es: 'Uso los MCPs disponibles para Figma para que la IA me ayude a diseñar adentro de la herramienta donde trabaja el equipo.' } },
    { tag: 'SOFIA', t: { en: 'Designing AI products', es: 'Diseñar productos con IA' }, d: { en: 'With SOFIA I learned to bring LLMs into an everyday product: a conversation that can also be tapped, spoken or shown, solving things the traditional site couldn’t.', es: 'Con SOFIA aprendí a llevar LLMs a un producto de todos los días: una conversación que también se puede tocar, hablar o mostrar, resolviendo cosas que el sitio tradicional no podía.' } },
    { tag: 'hardware', t: { en: 'Brot: AI you can put on a desk', es: 'Brot: IA para tu escritorio' }, d: { en: 'A desk companion I built: ESP32-S3, 1.8" AMOLED, LVGL interface, a web app it serves itself, and AI that talks about what actually happened in your day. Version one sent reminders, and I ignored them all within two weeks. So I redesigned it to do things with you instead of reminding you about them. What I learned is that an object like this is useful when it feels like company, more than when it sends alerts.', es: 'Un compañero de escritorio que construí: ESP32-S3, AMOLED de 1,8", interfaz en LVGL, una web que sirve el propio dispositivo e IA que te habla de lo que realmente pasó en tu día. La primera versión mandaba recordatorios y a las dos semanas los ignoraba todos. Así que lo rediseñé para que haga las cosas con vos en lugar de recordártelas. Aprendí que un objeto así sirve cuando se siente como compañía, más que cuando manda avisos.' } },
    { tag: 'meta', t: { en: 'This site', es: 'Este sitio' }, d: { en: 'Built in code with an AI coding agent, under my direction. I used AI to build faster and checked every claim against its source.', es: 'Hecho en código con un agente de IA, bajo mi dirección. Usé la IA para construir más rápido y verifiqué cada dato contra su fuente.' } },
  ] as { tag: string; t: L; d: L }[],
};

export const pogo = {
  eyebrow: { en: 'Building now · side project', es: 'Construyendo ahora · proyecto propio' } as L,
  title: { en: 'pogo.ar: “¿Qué toca hoy?”', es: 'pogo.ar: “¿Qué toca hoy?”' } as L,
  intro: {
    en: 'A product I’m designing and building myself, end to end. pogo puts the concerts and music shows from all over Argentina on a single map, pulled from the main ticketing platforms (Ticketek, AllAccess, Passline, Alpogo, Livepass, Venti and more) and updated several times a day.',
    es: 'Un producto que estoy diseñando y construyendo yo mismo, de punta a punta. pogo junta en un solo mapa los recitales y shows de música de todo el país, tomados de las principales ticketeras (Ticketek, AllAccess, Passline, Alpogo, Livepass, Venti y más) y actualizados varias veces por día.',
  } as L,
  points: [
    { en: '**Everything in one place.** Search by artist, venue or city without hopping between ticketing sites.', es: '**Todo en un solo lugar.** Buscá por artista, lugar o ciudad sin saltar entre ticketeras.' },
    { en: '**What’s on near you.** Today, tomorrow, this weekend or any date, on a list or on the map.', es: '**Qué hay cerca tuyo.** Hoy, mañana, el finde o cualquier fecha, en lista o en el mapa.' },
    { en: '**Straight to the ticket.** Every show links directly to where you buy it.', es: '**Directo a la entrada.** Cada show te lleva directo a donde se compra.' },
    { en: '**Product + design + build, by me.** The same instincts I use at work (aggregation, discovery, a short path to purchase) shipped as my own product.', es: '**Producto + diseño + desarrollo, hecho por mí.** Los mismos instintos que uso en el trabajo (agregación, descubrimiento, un camino corto a la compra) llevados a un producto propio.' },
  ] as L[],
  cta: { en: 'Visit pogo.ar', es: 'Entrá a pogo.ar' } as L,
  alt: { en: 'Screenshot of pogo.ar: a search bar, Today / Tomorrow / Weekend filters and cards for tonight’s shows', es: 'Captura de pogo.ar: buscador, filtros Hoy / Mañana / Finde y tarjetas de los shows de hoy' } as L,
};

export const contact = {
  eyebrow: { en: 'Contact', es: 'Contacto' } as L,
  title: { en: 'Building something people buy? Let’s talk.', es: '¿Estás construyendo algo que la gente compra? Hablemos.' } as L,
  sub: { en: 'Email is fastest. I reply in English or Spanish.', es: 'El mail es lo más rápido. Respondo en español o inglés.' } as L,
};

export const nav = [
  { href: '#work', label: { en: 'Work', es: 'Trabajo' }, min: '5' },
  { href: '#prototype', label: { en: 'Prototype', es: 'Prototipo' }, min: '5' },
  { href: '#lead', label: { en: 'Leadership', es: 'Liderazgo' }, min: '5' },
  { href: '#ai', label: { en: 'Design + AI', es: 'Diseño + IA' }, min: '5' },
  { href: '#building', label: { en: 'Building', es: 'Construyendo' }, min: '5' },
  { href: '#contact', label: { en: 'Contact', es: 'Contacto' }, min: '30' },
] as const;
