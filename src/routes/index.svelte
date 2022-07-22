<script lang="ts">
	import Meta from '../components/atoms/meta/Meta.svelte';
	import IndexDrawer from '../components/organisms/drawers/IndexDrawer.svelte';
	import IndexHeader from '../components/organisms/headers/IndexHeader.svelte';
	import { drawerData } from '../data/drawerData';

	// the id of the active drawer
	let activeDrawer = 0;

	// handle drawer change when user click on different items.
	function handleDrawerChange(i: number) {
		activeDrawer = i;
	}
</script>

<!-- META -->
<Meta />

<!-- DRAWER WRAPPER -->
<IndexDrawer activeIndex={activeDrawer} {handleDrawerChange}>
	<!-- HEADER -->
	<IndexHeader />

	<!-- DYNAMIC COMPONENT BODY -->
	<svelte:component this={drawerData[activeDrawer].component} />
</IndexDrawer>
