import type { SvelteComponentTyped } from 'svelte';
import ComingSoonBodySvelte from '../components/templates/ComingSoonBody.svelte';
import BigOBody from '../components/templates/BigOBody.svelte';

export interface IDrawerData {
  id: number;
  title: string;
  component: new (...args: any) => SvelteComponentTyped;
}

export const drawerData: IDrawerData[] = [
  {
    id: 0,
    title: 'Big O Notation',
    component: BigOBody,
  },
  {
    id: 1,
    title: 'Search Algorithm',
    component: ComingSoonBodySvelte,
  },
  {
    id: 2,
    title: 'Sort Algorithm',
    component: ComingSoonBodySvelte,
  },
  {
    id: 3,
    title: 'Path-finding Algorithm',
    component: ComingSoonBodySvelte,
  },
  {
    id: 4,
    title: 'Others Algorithm',
    component: ComingSoonBodySvelte,
  },
];
