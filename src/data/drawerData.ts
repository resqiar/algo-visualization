import type { SvelteComponentTyped } from 'svelte';
import ComingSoonBodySvelte from '../components/templates/ComingSoonBody.svelte';
import BigOBody from '../components/templates/BigOBody.svelte';
import PathFindingBody from '../components/templates/PathFindingBody.svelte';
import SortingBody from '../components/templates/SortingBody.svelte';

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
		title: 'Sorting Algorithm',
		component: SortingBody,
	},
	{
		id: 2,
		title: 'Path Finding Algorithm',
		component: PathFindingBody,
	},
	{
		id: 3,
		title: 'Others Algorithm',
		component: ComingSoonBodySvelte,
	},
];
