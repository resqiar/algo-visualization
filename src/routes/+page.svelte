<script lang="ts">
	import { onMount } from 'svelte';
	import { drawerData } from '../data/drawerData';
	import { themeChange } from 'theme-change';
	import Meta from '../components/atoms/meta/Meta.svelte';
	import IndexDrawer from '../components/organisms/drawers/IndexDrawer.svelte';
	import IndexHeader from '../components/organisms/headers/IndexHeader.svelte';

	// the id of the active drawer
	let activeDrawer = 0;

	// handle drawer change when user click on different items.
	function handleDrawerChange(i: number) {
		activeDrawer = i;
	}

	// Mount saved theme from local storage
	onMount(() => {
		themeChange(false);
	});
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
