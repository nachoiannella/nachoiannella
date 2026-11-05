import type { MDXComponents } from 'mdx/types';
import { mdxComponentsFor } from '@/components/mdx';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponentsFor('en'), ...components };
}
