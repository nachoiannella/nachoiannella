import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import { Todo } from '@/components/T';
import { Decision } from '@/components/Decision';
import { slugify, textOf } from '@/lib/slug';

export function mdxComponentsFor(lang: 'en' | 'es', prefix = ''): MDXComponents {
  return {
    h2: ({ children }: { children?: ReactNode }) => {
      const id = `${prefix}${lang}-${slugify(textOf(children))}`;
      return (
        <h2 id={id} className="group">
          <a href={`#${id}`} className="no-underline !text-fg hover:!text-accent">{children}</a>
        </h2>
      );
    },
    a: ({ href = '', children }: { href?: string; children?: ReactNode }) =>
      href.startsWith('http') ? (
        <a href={href} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only"> (opens in a new tab)</span></a>
      ) : (
        <a href={href}>{children}</a>
      ),
    Todo: ({ children, id, nda }: { children?: ReactNode; id?: string; nda?: boolean }) => <Todo id={id} nda={nda}>{children}</Todo>,
    Decision: (p: React.ComponentProps<typeof Decision>) => <Decision {...p} lang={lang} />,
  };
}
