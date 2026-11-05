import CartEn from './despegar-cart-cross-sell.en.mdx';
import CartEs from './despegar-cart-cross-sell.es.mdx';
import SofiaEn from './sofia-ai-travel-assistant.en.mdx';
import SofiaEs from './sofia-ai-travel-assistant.es.mdx';
import TmEn from './travel-mode.en.mdx';
import TmEs from './travel-mode.es.mdx';

export const caseBodies: Record<string, { en: typeof CartEn; es: typeof CartEn }> = {
  'despegar-cart-cross-sell': { en: CartEn, es: CartEs },
  'sofia-ai-travel-assistant': { en: SofiaEn, es: SofiaEs },
  'travel-mode': { en: TmEn, es: TmEs },
};
